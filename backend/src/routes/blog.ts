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
      shortDescription: body.description,
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

  const userId = c.get('userId').toString(); // Assuming you are passing userId in headers or somewhere accessible

  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      shortDescription: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true // Select avatar from the User's image field
        }
      },
      _count: {
        select: {
          likes: true,    // Count of likes on the post
          comments: true  // Count of comments on the post
        }
      },
      likes: {
        where: {
          userId: userId // Filter likes by current user
        },
        select: {
          id: true // Just to check existence
        }
      }
    }
  });

  // Add 'liked' field based on whether the user has liked the post
  const enhancedBlogs = blogs.map(blog => ({
    ...blog,
    liked: blog.likes.length > 0 // Check if there's any like entry for the current user
  }));

  return c.json({
    blogs: enhancedBlogs,
  });
});


// like a blog
blogRouter.post('/like', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);
  const userId = c.get('userId').toString();
  console.log(userId);
  try {
    if (body.like === false) {
      // Handle unlike
      await prisma.like.deleteMany({
        where: {
          userId: userId,
          postId: body.blogId,
        },
      });

      // delete notification:
      await prisma.notification.deleteMany({
        where: { // @ts-ignore
          authorId: body.authorId.toString() || "",
          postId: body.blogId,
          userId: userId,
        }
      })


      c.status(200)
      return c.json({
        msg: 'unliked successfully'
      })
    } else {
      // Handle like
      const existingLike = await prisma.like.findFirst({
        where: {
          userId: userId,
          postId: body.blogId,
        },
      });

      if (!existingLike) {
        await prisma.like.create({
          data: {
            userId: userId,
            postId: body.blogId,
          },
        });

        const user = await prisma.user.findFirst({
          where:{
            id: userId
          }
        })

        
        // add notification
        await prisma.notification.create({
          data: { // @ts-ignore
            authorId: body.authorId.toString() || "",
            postId: body.blogId,
            userId: userId,
            userName: user?.name || "",
            userImage: user?.image || "",
            message: "Liked Your Post.",
          }
        })
        
        c.status(200)
        return c.json({
          msg: 'liked successfully'
        })
      } else {
        c.status(200)
        return c.json({
          msg: 'liked successfully'
        })
      }
    }
  } catch (error) {
    console.error(error);
    return c.status(500);
  }
});


blogRouter.get("/get-blogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // @ts-ignore
  const id = c.get('userId').toString();

  const blogs = await prisma.post.findMany({
    where: {
      authorId: id
    }
  });

  return c.json({
    blogs
  })

});

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const postId = c.req.param('id');
  const userId = c.get('userId').toString();

  const blog = await prisma.post.findFirst({
    where: { id: postId },
    select: {
      id: true,
      title: true,
      shortDescription: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true
        }
      },
      likes: {
        where: {
          userId: userId
        },
        select: {
          id: true
        }
      }
    }
  });

  const liked = blog.likes.length > 0;

  return c.json({
      blog: {
          ...blog,
          liked
      }
  });
});



  
blogRouter.onError((err, c) => {
    console.error(err)
    return c.json({ error: err.message }, 411)
})