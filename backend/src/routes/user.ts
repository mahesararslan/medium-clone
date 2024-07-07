import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from "@mahesararslan/medium-app-common";

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

userRouter.onError((err, c) => {
    console.error(err)
    return c.json({ error: 'Internal Server Error' }, 500)
})