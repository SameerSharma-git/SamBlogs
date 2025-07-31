import ProfileClientView from '@/components/ProfileClientView';
import './profile.css'
import { fetchBlogById } from '@/lib/actions/fetchBlogs';
import { findUser } from '@/lib/actions/findUser';
import { decodeJWT } from '@/lib/actions/jwt_token';
import Link from 'next/link';

export default async function ProfilePage() {

  const user = {
    _id: 'user123',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Professional profile pic from Pexels
    name: 'Sameer Sharma',
    email: 'sameer.sharma@example.com',
    bio: 'Passionate full-stack developer and an avid blogger. I love sharing insights on web development, AI, and productivity. Always learning, always creating.',
    role: 'writer',
    createdAt: '2023-01-15T10:00:00Z',
    following: ['user456', 'user789'],
    followers: ['userabc', 'userdef', 'userghi'],
    posts: [
      {
        _id: 'post1',
        title: 'The Future of Web Development with AI',
        slug: 'the-future-of-web-development-with-ai',
        excerpt: 'Exploring how artificial intelligence is shaping the landscape of modern web applications...',
        content: '<p>This is the full content of the AI blog post. It delves into the latest trends, challenges, and opportunities in integrating artificial intelligence with web development, from AI-powered chatbots to intelligent user interfaces. The article covers various frameworks and libraries that facilitate this integration, providing examples and best practices.</p><p>We discuss the ethical implications and future prospects of AI in web design, emphasizing the importance of responsible development. Stay tuned for more deep dives into cutting-edge technologies!</p>',
        author: 'Sameer Sharma',
        category: 'Technology',
        date: '2024-07-10T14:30:00Z', // Example date string
        updatedAt: '2024-07-10T14:30:00Z', // Example updatedAt
        imageURL: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Changed to imageURL
      },
      {
        _id: 'post2',
        title: '10 Tips for Productive Remote Work',
        slug: '10-tips-for-productive-remote-work',
        excerpt: 'Maximizing your efficiency and well-being while working from home.',
        content: '<p>Working remotely offers flexibility but also requires discipline. This article provides 10 actionable tips to boost your productivity, from setting up a dedicated workspace to managing your time effectively. We cover communication strategies, maintaining work-life balance, and leveraging technology to stay connected with your team.</p><p>Implement these tips to transform your remote work experience and achieve your professional goals with ease.</p>',
        author: 'Sameer Sharma',
        category: 'Productivity',
        date: '2024-06-28T10:00:00Z',
        updatedAt: '2024-06-28T10:00:00Z',
        imageURL: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Changed to imageURL
      },
      {
        _id: 'post3',
        title: 'Mastering React Hooks',
        slug: 'mastering-react-hooks',
        excerpt: 'A comprehensive guide to understanding and using React Hooks effectively.',
        content: '<p>React Hooks revolutionized state management and side effects in functional components. This guide takes you from basic `useState` and `useEffect` to more advanced hooks like `useContext`, `useReducer`, and custom hooks. Learn how to write cleaner, more reusable, and more testable React code.</p><p>We provide practical examples and common pitfalls to avoid, ensuring you master React Hooks for your next project.</p>',
        author: 'Sameer Sharma',
        category: 'Technology',
        date: '2024-05-20T11:45:00Z',
        updatedAt: '2024-05-20T11:45:00Z',
        imageURL: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Changed to imageURL
      },
      {
        _id: 'post4',
        title: 'Healthy Eating for Busy Professionals',
        slug: 'healthy-eating-for-busy-professionals',
        excerpt: 'Quick and nutritious meal prep ideas to boost your energy.',
        content: '<p>Maintaining a healthy diet can be challenging for busy professionals. This article offers practical meal prep strategies and nutritious recipe ideas that are quick to prepare and easy to transport. Discover how to fuel your body for peak performance without sacrificing taste or time.</p><p>From power breakfasts to satisfying dinners, we\'ve got you covered with delicious and healthy options.</p>',
        author: 'Sameer Sharma',
        category: 'Wellness',
        date: '2024-04-05T09:00:00Z',
        updatedAt: '2024-04-05T09:00:00Z',
        imageURL: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Changed to imageURL
      },
      {
        _id: 'post5',
        title: 'The Art of Storytelling in Blogging',
        slug: 'the-art-of-storytelling-in-blogging',
        excerpt: 'Learn how to craft compelling narratives that captivate your audience.',
        content: '<p>Storytelling is a powerful tool for engaging your audience and making your content memorable. This article explores the principles of effective storytelling in blogging, from developing relatable characters to creating compelling plots. Learn how to weave narratives into your articles to connect with readers on a deeper level.</p><p>Unleash your inner storyteller and transform your blog into a captivating experience.</p>',
        author: 'Sameer Sharma',
        category: 'Arts',
        date: '2024-03-01T16:00:00Z',
        updatedAt: '2024-03-01T16:00:00Z',
        imageURL: 'https://images.pexels.com/photos/218969/pexels-photo-218969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Changed to imageURL
      },
      // --- NEW POSTS ADDED BELOW ---
      {
        _id: 'post6',
        title: 'Exploring the World of Quantum Computing',
        slug: 'exploring-quantum-computing',
        excerpt: 'A beginner\'s guide to the fascinating and complex realm of quantum computing and its potential impact.',
        content: '<p>Quantum computing is no longer just science fiction. This post breaks down the basics of quantum mechanics, qubits, and quantum entanglement in an easy-to-understand way. We explore the current state of quantum technology, its potential applications in fields like medicine and finance, and the challenges that lie ahead.</p><p>Join us on this journey into the future of computation!</p>',
        author: 'Sameer Sharma',
        category: 'Science',
        date: '2024-02-15T09:00:00Z',
        updatedAt: '2024-02-15T09:00:00Z',
        imageURL: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Quantum computing image
      },
      {
        _id: 'post7',
        title: 'Mindfulness Practices for Daily Life',
        slug: 'mindfulness-practices-daily-life',
        excerpt: 'Simple yet powerful mindfulness techniques to reduce stress and improve focus.',
        content: '<p>In our fast-paced world, finding moments of calm is essential. This article introduces practical mindfulness exercises you can incorporate into your daily routine, from mindful breathing to walking meditation. Learn how to cultivate present-moment awareness to enhance your well-being and emotional resilience.</p><p>Start your journey to a more peaceful and focused life today.</p>',
        author: 'Sameer Sharma',
        category: 'Wellness',
        date: '2024-01-20T13:00:00Z',
        updatedAt: '2024-01-20T13:00:00Z',
        imageURL: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Mindfulness/Meditation image
      },
      {
        _id: 'post8',
        title: 'The Rise of No-Code Development',
        slug: 'rise-of-no-code-development',
        excerpt: 'How no-code platforms are empowering creators and transforming the software industry.',
        content: '<p>No-code development is democratizing software creation, allowing individuals without traditional coding skills to build powerful applications. This post explores the benefits of no-code platforms, popular tools, and real-world examples of successful no-code projects. We discuss how this trend is impacting the future of work and innovation.</p><p>Discover if no-code is the right path for your next digital venture.</p>',
        author: 'Sameer Sharma',
        category: 'Technology',
        date: '2023-12-05T10:00:00Z',
        updatedAt: '2023-12-05T10:00:00Z',
        imageURL: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // No-code/Development image
      },
      {
        _id: 'post9',
        title: 'Sustainable Travel: Exploring the World Responsibly',
        slug: 'sustainable-travel-responsibly',
        excerpt: 'Tips and insights for minimizing your environmental impact while enjoying your adventures.',
        content: '<p>Travel can be a powerful force for good, but it also has an environmental footprint. This article provides practical advice for sustainable travel, from choosing eco-friendly accommodations to supporting local communities. Learn how to reduce your carbon emissions, conserve resources, and travel more mindfully.</p><p>Make your next adventure a responsible one!</p>',
        author: 'Sameer Sharma',
        category: 'Travel',
        date: '2023-11-18T15:00:00Z',
        updatedAt: '2023-11-18T15:00:00Z',
        imageURL: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Sustainable travel image
      },
      {
        _id: 'post10',
        title: 'The Power of Habit: Building a Better You',
        slug: 'power-of-habit-building-better-you',
        excerpt: 'Understanding the science behind habit formation and how to leverage it for personal growth.',
        content: '<p>Our habits shape who we are. This post dives into the psychology of habit formation, drawing insights from behavioral science. Learn about the habit loop (cue, routine, reward) and discover actionable strategies for building positive habits and breaking negative ones. Transform your daily routines into stepping stones for success.</p><p>Unlock your potential by mastering the art of habit.</p>',
        author: 'Sameer Sharma',
        category: 'Wellness',
        date: '2023-10-01T11:00:00Z',
        updatedAt: '2023-10-01T11:00:00Z',
        imageURL: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Habit/Growth image
      },
    ],
  };

  const userPayload = await decodeJWT()
  let userData;
  if (userPayload) {
    const mongoUser = JSON.parse(JSON.stringify(await findUser({ email: userPayload.email })))
    let userBlogs = [];
    for (let i = 0; i < mongoUser.posts.length; i++) {
      const postId = mongoUser.posts[i];
      userBlogs.push(await fetchBlogById(postId))
    }

    userData = JSON.parse(JSON.stringify({ ...mongoUser, posts: userBlogs }))
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background-primary text-text-primary">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-lg text-text-secondary">Please log in to view your profile.</p>
          <Link href="/login" passHref>
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Pass the fetched user data to the Client Component
  return <ProfileClientView user={userData} />;
}