CREATE TABLE "public.posts" (
	"id" serial NOT NULL,
	"link" TEXT NOT NULL,
	"article" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" TEXT NOT NULL,
	"picUrl" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.comments" (
	"id" serial NOT NULL,
	"comment" TEXT NOT NULL,
	"createdAt" TEXT NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.likes" (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.followers" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"followerId" integer NOT NULL,
	CONSTRAINT "followers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.reposts" (
	"id" serial NOT NULL,
	"isRepost" BOOLEAN NOT NULL DEFAULT 'true',
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'now()',
	"postId" integer NOT NULL,
	"userRepostId" integer NOT NULL,
	CONSTRAINT "reposts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.hashtags" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "hashtags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.postHashtag" (
	"id" serial NOT NULL,
	"hashtagId" integer NOT NULL,
	"postId" integer NOT NULL,
	CONSTRAINT "postHashtag_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "public.posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "public.users"("id");


ALTER TABLE "public.comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("postId") REFERENCES "public.posts"("id");
ALTER TABLE "public.comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "public.users"("id");

ALTER TABLE "public.likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("postId") REFERENCES "public.posts"("id");
ALTER TABLE "public.likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("userId") REFERENCES "public.users"("id");

ALTER TABLE "public.followers" ADD CONSTRAINT "followers_fk0" FOREIGN KEY ("userId") REFERENCES "public.users"("id");
ALTER TABLE "public.followers" ADD CONSTRAINT "followers_fk1" FOREIGN KEY ("followerId") REFERENCES "public.users"("id");

ALTER TABLE "public.reposts" ADD CONSTRAINT "reposts_fk0" FOREIGN KEY ("postId") REFERENCES "public.posts"("id");
ALTER TABLE "public.reposts" ADD CONSTRAINT "reposts_fk1" FOREIGN KEY ("userRepostId") REFERENCES "public.users"("id");


ALTER TABLE "public.postHashtag" ADD CONSTRAINT "postHashtag_fk0" FOREIGN KEY ("hashtagId") REFERENCES "public.hashtags"("id");
ALTER TABLE "public.postHashtag" ADD CONSTRAINT "postHashtag_fk1" FOREIGN KEY ("postId") REFERENCES "public.posts"("id");
