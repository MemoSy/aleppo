"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

// Mock data for posts

export default function DashboardPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    _id: "",
    author: "",
    category: "",
    content: "",
  });
  const [editingPost, setEditingPost] = useState<typeof newPost | null>(null);
  const createTags = useMutation(api.tags.createTags);
  // @ts-ignore
  const getTags = useQuery(api.tags.getTags);
  const deleteTag = useMutation(api.tags.deleteTag);
  const updateTag = useMutation(api.tags.updateTag);
  // @ts-ignore
  const getNews = useQuery(api.news.getCurrentNews);
  const createNews = useMutation(api.news.createNews);
  const [newNews, setNewNews] = useState({ text: "" });
  const getComplaints = useQuery(api.complaints.getComplaints);

  useEffect(() => {
    const storedSignIn = localStorage.getItem("isSignedIn");
    if (storedSignIn === "true") {
      setIsSignedIn(true);
    }
  }, []);

  useEffect(() => {
    if (getTags) {
      console.log(getTags);
      // @ts-ignore
      setPosts(getTags);
    }
  }, [getTags]);

  if (getTags === undefined) {
    return <div>Loading...</div>;
  }

  if (getNews === undefined) {
    return <div>Loading...</div>;
  }

  if (getComplaints === undefined) {
    return <div>Loading...</div>;
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "memo" && password === "a3312773") {
      setIsSignedIn(true);
      setError("");
      localStorage.setItem("isSignedIn", "true");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();

    setNewPost({ _id: "", author: "", category: "", content: "" });
    createTags({
      content: newPost.content,
      author: newPost.author,
      categorys: newPost.category,
    });
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    setNewNews({ text: "" });
    createNews(newNews);
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post: any) => post._id !== id));
    deleteTag({ id: id });
  };

  const handleUpdatePost = (
    tagId: string,
    content: string,
    author: string,
    categorys: string,
  ) => {
    updateTag({
      id: tagId,
      content: content,
      author: author,
      categorys: categorys,
    });
  };

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
        <Card className="w-full max-w-md bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSignIn}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  const roleTranslations = {
    "وزارة الأوقاف": "Ministry of Endowments",
    "المؤسسة العامة للنقل": "Public Transportation Establishment",
    "مؤسسة المياه": "Water Institution",
    "وزارة الصحة": "Ministry of Health",
    "وزارة التربية والتعليم": "Ministry of Education",
    "وزارة الإدارة المحلية": "Ministry of Local Administration",
    "وزارة الإعلام": "Ministry of Information",
    "مؤسسة النظافة": "Cleaning Institution",
    "وزارة الزراعة": "Ministry of Agriculture",
    "مديرية المصالح العقارية": "Real Estate Services Directorate",
    "مؤسسة الكهرباء": "Electricity Institution",
    المالية: "Finance",
    "المؤسسة العامة للاتصالات": "Public Telecommunications Establishment",
    "وزارة التنمية": "Ministry of Development",
    "وزارة الداخلية": "Ministry of Interior",
    "وزارة الاقتصاد": "Ministry of Economy",
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="min-h-screen bg-gray-100 p-8 w-[70%]">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList className="bg-white rounded-[6px] p-2 py-6 border">
            <TabsTrigger
              className='data-[state="active"]:bg-[#F3F4F6]'
              value="posts"
            >
              {" "}
              كل الأخبار
            </TabsTrigger>
            <TabsTrigger
              className='data-[state="active"]:bg-[#F3F4F6]'
              value="new"
            >
              {" "}
              أضف خبر جديد
            </TabsTrigger>
            <TabsTrigger
              className='data-[state="active"]:bg-[#F3F4F6]'
              value="media"
            >
              أضف خبر عاجل
            </TabsTrigger>
            <TabsTrigger
              className='data-[state="active"]:bg-[#F3F4F6]'
              value="complaints"
            >
              {" "}
              الشكاوى
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>All Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post: any) => (
                      <TableRow key={post._id}>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.categorys}</TableCell>
                        <TableCell>
                          {post.content.substring(0, 50)}...
                        </TableCell>
                        <TableCell>{formatDate(post._creationTime)}</TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                              >
                                Edit
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Edit Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Make changes to your post here. Click save
                                  when you&apos;re done.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-author">Author</Label>
                                  <Input
                                    id="edit-author"
                                    value={editingPost?.author || post.author}
                                    onChange={(e) =>
                                      setEditingPost({
                                        ...editingPost!,
                                        author: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-category">
                                    Category
                                  </Label>
                                  <Select
                                    value={
                                      editingPost?.category || post.category
                                    }
                                    onValueChange={(value) =>
                                      setEditingPost({
                                        ...editingPost!,
                                        category: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger id="edit-category">
                                      <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                      {Object.entries(roleTranslations).map(
                                        ([arabicRole, englishRole]) => (
                                          <SelectItem
                                            key={englishRole}
                                            value={englishRole}
                                          >
                                            {englishRole}
                                          </SelectItem>
                                        ),
                                      )}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-content">Content</Label>
                                  <Textarea
                                    id="edit-content"
                                    value={editingPost?.content || post.content}
                                    onChange={(e) =>
                                      setEditingPost({
                                        ...editingPost!,
                                        content: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  onClick={() => setEditingPost(null)}
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    handleUpdatePost(
                                      post._id,
                                      editingPost!.content || post.content,
                                      editingPost!.author || post.author,
                                      editingPost!.category || post.categorys,
                                    );
                                  }}
                                >
                                  Save
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your post.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletePost(post._id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="new">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={newPost.author}
                      onChange={(e) =>
                        setNewPost({ ...newPost, author: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newPost.category}
                      onValueChange={(value) =>
                        setNewPost({ ...newPost, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {Object.entries(roleTranslations).map(
                          ([arabicRole, englishRole]) => (
                            <SelectItem key={englishRole} value={englishRole}>
                              {arabicRole}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newPost.content}
                      onChange={(e) =>
                        setNewPost({ ...newPost, content: e.target.value })
                      }
                      required
                      className="min-h-[200px]"
                    />
                  </div>
                  <Button type="submit">Create Post</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="media">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>عاجل</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {getNews.map((news: any) => (
                  <Card className="bg-white pt-2" key={news._id}>
                    <CardContent>
                      <CardTitle className="translate-y-1.5 flex justify-between items-center">
                        {news.text}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteTag({ id: news._id })}
                        >
                          <Trash size={16} color="red" />
                        </Button>
                      </CardTitle>
                    </CardContent>
                  </Card>
                ))}
                <br />
                <form
                  className="flex gap-2 items-center"
                  onSubmit={handleCreateNews}
                >
                  <Input
                    className="w-full"
                    value={newNews.text}
                    onChange={(e) => setNewNews({ text: e.target.value })}
                    placeholder="Enter news text"
                  />
                  <Button type="submit">Create News</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="complaints">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>شكاوي</CardTitle>
              </CardHeader>
              <CardContent dir="rtl" className="flex flex-col gap-4">
                {getComplaints.map((complaint: any) => (
                  <Card className="bg-white pt-2" key={complaint._id}>
                    <CardContent>
                      <CardTitle className="translate-y-1.5 relative flex justify-between items-center">
                        {complaint.text}
                        <p className="absolute -top-3 right-0 text-xs text-gray-400">
                          {complaint.adress}
                        </p>
                        <div className="flex gap-2 flex-col items-center">
                          <p>{complaint.ministry}</p>
                          <p>{complaint.area}</p>
                        </div>
                      </CardTitle>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
