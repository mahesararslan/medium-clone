import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { signupInput, signinInput } from "@mahesararslan/medium-app-common";
import z from "zod";
import { use } from "hono/jsx";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

// Function to hash passwords in Cloudflare workers as bcrypt doesnot work in cloudflare.
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
}

// google-signin route:
userRouter.post('/google-signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { name, email, picture } = await c.req.json();  

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });


  // set header for cross origin
  c.header('Cross-Origin-Opener-Policy', 'unsafe-none');
  c.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        image: picture
      }
    });

    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);
    return c.json({ jwt: token });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt: token });
});

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if(!success) {
    c.status(411);
    return c.json({
      msg: "Invalid inputs"
    })
  }

  const hashedPassword = await hashPassword(body.password);

  const user = await prisma.user.create({
    data: { 
      name: body.name,
      email: body.email,
      password: hashedPassword,
    }
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt: token });
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if(!success) {
    c.status(411);
    return c.json({
      msg: "Invalid inputs"
    })
  }

  const user = await prisma.user.findFirst({
    where: { email: body.email }
  });

  if (!user) {
    c.status(403); // status code for unauthorized 
    return c.json({
      error: 'User not found',
    });
  }
  
  // if user was a google account.
  if(user.password === null) {
    c.status(403);
    return c.json({
      error: 'User not found',
    });
  }

  // @ts-ignore
  const isPasswordValid = await verifyPassword(body.password, user.password);

  if (!isPasswordValid) {
    c.status(403);
    return c.json({
      error: 'Invalid password',
    });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET); 
  // @ts-ignore
  return c.json({ jwt: token });
});

async function AuthMiddleware (c: any, next: any) {
  const header = c.req.header('authorization') || "";
  const token = header.split(' ')[1];

  try {
    const response = await verify(token, c.env.JWT_SECRET);
    if (response.id) {
      c.set('userId', response.id.toString()); // Ensure userId is set as a string
      await next();
    } else {
      c.status(403);
      return c.json({ error: "You are not logged in" });
    }
  } catch (err) {
    c.status(403);
    return c.json({ // @ts-ignore
      error: "You are not logged in",
    });
  }
};

userRouter.get("/get-user", AuthMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // @ts-ignore
  const id = c.get('userId').toString();

  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  });

  return c.json({
    user
  })

});

const updateInput = z.object({
  password: z.string().min(6).optional(),
  name: z.string().optional()
})

userRouter.put("/update-user", AuthMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // @ts-ignore
  const id = c.get('userId').toString();
  const body = await c.req.json();
  const { success } = updateInput.safeParse(body);

  if(!success) {
    c.status(411);
    return c.json({
      msg: "Invalid inputs"
    })
  }

  if(body.name & body.password) {
    const hashedPassword = await hashPassword(body.password);
    const user = await prisma.user.update({
      data: {
        name: body.name,
        password: hashedPassword
      },
      where: {
        id: id
      }
    });
  
    return c.json({
      user
    })
  }
  else if(body.name) {
    const user = await prisma.user.update({
      data: {
        name: body.name,
      },
      where: {
        id: id
      }
    });
  
    return c.json({
      user
    })
  }
  else if(body.password) {
    const hashedPassword = await hashPassword(body.password);
    const user = await prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: id
      }
    });
  
    return c.json({
      user
    })
  }

  return c.json({
    msg: "Nothing to Update"
  })

});

userRouter.onError((err, c) => {
    console.error(err)
    return c.json({ error: 'Internal Server Error' }, 500)
})