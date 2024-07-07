import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@mahesararslan/medium-app-common';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }, 
  Variables: {
    userId: string
  }
}>();

// Authentication Middleware
blogRouter.use('/*', async (c, next) => {
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
});

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get('userId');
  
  const { success } = createBlogInput.safeParse(body);

  if(!success) {
    c.status(411);
    return c.json({
      msg: "Invalid inputs"
    })
  }

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content, // @ts-ignore
      authorId: authorId,
    },
  });

  return c.json(post);
});

  
blogRouter.put('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = createBlogInput.safeParse(body);
  
    if(!success) {
      c.status(411);
      return c.json({
        msg: "Invalid inputs"
      })
    }

    await prisma.post.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,  
        }
    });
    return c.json({
        id: body.id
    });
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    }); // returns all blogs

    return c.json({
        blogs,
    })
})
  
// in a get request, you should use query params to pass the id[Dynamic Parameter]
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param('id');

    const blog = await prisma.post.findUnique({
        where: { // @ts-ignore
            id: id
        },
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              name: true
            }
          }
        }
    })

    return c.json ({
        blog
    })

})
  
blogRouter.onError((err, c) => {
    console.error(err)
    return c.json({ error: err.message }, 411)
})