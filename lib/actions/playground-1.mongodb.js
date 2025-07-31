use('SamBlogDB');

db.users.drop();
// db.posts.drop();
const mockUsers = [
  {
    "profilePicture": "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    "name": "Liam Carter",
    "email": "liam.carter@example.com",
    "password": "hashedpassword1",
    "bio": "Aspiring blogger and tech geek.",
    "role": "writer",
    "following": [],
    "followers": [],
    "posts": []
  },
  {
    "profilePicture": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    "name": "Sophia Bennett",
    "email": "sophia.bennett@example.com",
    "password": "hashedpassword2",
    "bio": "Food lover and recipe creator.",
    "role": "writer",
    "following": [],
    "followers": [],
    "posts": []
  },
  {
    "profilePicture": "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    "name": "Ava Mitchell",
    "email": "ava.mitchell@example.com",
    "password": "hashedpassword4",
    "bio": "Passionate about writing and poetry.",
    "role": "writer",
    "following": [],
    "followers": [],
    "posts": []
  },
  {
    "profilePicture": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    "name": "Ethan Reyes",
    "email": "ethan.reyes@example.com",
    "password": "hashedpassword5",
    "bio": "Web developer and open source fan.",
    "role": "writer",
    "following": [],
    "followers": [],
    "posts": []
  }
]
// db.users.insertMany(mockUsers)
let blogs1 = [
  {
    title: "The Future of AI in Content Creation",
    slug: "the-future-of-ai-in-content-creation",
    excerpt: "Explore how artificial intelligence is revolutionizing the way we create and consume content, from automated writing to personalized recommendations.",
    content: `
    <p>Artificial intelligence is rapidly transforming various industries, and content creation is no exception. From generating engaging articles to crafting compelling marketing copy, AI tools are empowering writers, marketers, and businesses to produce high-quality content at an unprecedented scale.</p>
    <p>One of the most significant advancements is in natural language generation (NLG). AI models can now take structured data or a few prompts and produce coherent, grammatically correct, and contextually relevant text. This has opened doors for automating routine content tasks, such as generating financial reports, product descriptions, or sports summaries.</p>
    <p>Beyond automation, AI assists in content optimization. Tools powered by machine learning can analyze vast amounts of data to identify trending topics, optimal keywords, and audience preferences. This allows creators to tailor their content for maximum impact and reach, improving SEO and engagement.</p>
    <p>However, the rise of AI in content creation also brings ethical considerations. Questions around originality, bias in algorithms, and the future of human creativity are at the forefront. While AI can augment human capabilities, the unique human touch—creativity, empathy, and critical thinking—remains irreplaceable for truly impactful storytelling.</p>
    <p>As AI technology continues to evolve, we can expect even more sophisticated tools that will further blur the lines between human and machine-generated content. The future likely involves a collaborative ecosystem where AI acts as a powerful assistant, freeing up human creators to focus on strategic thinking, innovation, and deep emotional connection with their audience.</p>
  `,
    author: "Alex Johnson",
    date: "July 10, 2025",
    category: "Technology",
    imageURL: "https://placehold.co/600x400/60A5FA/FFFFFF?text=AI+Content"
  },
  {
    title: "A Culinary Journey Through Southeast Asia",
    slug: "a-culinary-journey-through-southeast-asia",
    excerpt: "Embark on a gastronomic adventure as we explore the vibrant flavors and unique cooking traditions of Southeast Asia.",
    content: `
    <p>Southeast Asia is a paradise for food lovers, a region where every street corner offers a new culinary delight. From the bustling night markets of Bangkok to the serene rice paddies of Bali, the food scene is as diverse and vibrant as its cultures.</p>
    <p>Thai cuisine, with its perfect balance of sweet, sour, salty, and spicy, is a global favorite. Think of the aromatic Tom Yum Goong, the creamy Green Curry, or the ubiquitous Pad Thai. Each dish tells a story of fresh ingredients and bold flavors.</p>
    <p>Vietnam offers a lighter, herb-infused experience. The iconic Pho, a comforting noodle soup, and the fresh, vibrant spring rolls are testament to a cuisine that values freshness and delicate balance.</p>
    <p>Malaysia and Singapore, influenced by Malay, Chinese, and Indian traditions, present a fusion of flavors. Laksa, Nasi Lemak, and Hainanese Chicken Rice are just a few examples of the rich tapestry of dishes found here.</p>
    <p>Beyond the popular dishes, exploring local markets and trying street food is essential. It's where you'll find authentic flavors, interact with local vendors, and truly immerse yourself in the culinary heart of the region. So pack your appetite and prepare for an unforgettable gastronomic adventure!</p>
  `,
    author: "David Chen",
    date: "July 5, 2025",
    category: "Food",
    imageURL: "https://placehold.co/600x400/FCA5A5/FFFFFF?text=Asian+Food"
  },
  {
    title: "Mindfulness for Modern Living: Finding Peace in Chaos",
    slug: "mindfulness-for-modern-living",
    excerpt: "Discover practical tips and techniques for incorporating mindfulness into your daily routine to reduce stress and improve well-being.",
    content: `
    <p>In our fast-paced modern world, finding moments of peace and calm can feel like a luxury. However, the practice of mindfulness offers a powerful antidote to stress and anxiety, allowing us to cultivate a greater sense of presence and well-being in our daily lives.</p>
    <p>Mindfulness is simply the practice of being present. It involves paying attention to the current moment, including your thoughts, feelings, bodily sensations, and the surrounding environment, without judgment. It's about observing, not reacting.</p>
    <p>Simple mindfulness exercises can be integrated into your routine. Start with mindful breathing: take a few deep breaths, focusing solely on the sensation of air entering and leaving your body. When your mind wanders, gently bring it back to your breath.</p>
    <p>Mindful eating is another powerful practice. Instead of rushing through meals, savor each bite, noticing the flavors, textures, and aromas. Engage all your senses in the experience.</p>
    <p>Even a mindful walk, where you pay attention to the feeling of your feet on the ground, the sounds around you, and the sights you encounter, can be a profound experience. Regular practice, even for a few minutes each day, can significantly reduce stress, improve focus, and enhance overall emotional resilience.</p>
  `,
    author: "Sarah Lee",
    date: "June 28, 2025",
    category: "Wellness",
    imageURL: "https://placehold.co/600x400/99F6E4/FFFFFF?text=Mindfulness"
  },
  {
    title: "The Art of Storytelling in Digital Media",
    slug: "the-art-of-storytelling-in-digital-media",
    excerpt: "Learn how compelling narratives are crafted for various digital platforms, engaging audiences like never before.",
    content: `
    <p>Storytelling has been a fundamental part of human communication for millennia, and in the digital age, its importance has only grown. From viral videos to interactive narratives, digital media offers unprecedented avenues for captivating audiences.</p>
    <p>The key to effective digital storytelling lies in understanding the platform. A compelling story for TikTok will differ vastly from one designed for a long-form blog post or an interactive web experience. Brevity, visual impact, and immediate engagement are often paramount.</p>
    <p>Visuals play a crucial role. High-quality images, engaging videos, and thoughtful graphics can convey emotions and information far more effectively than text alone. The rise of visual platforms like Instagram and YouTube is a testament to this.</p>
    <p>Interactivity is another powerful tool. Quizzes, polls, clickable elements, and user-generated content can transform a passive audience into active participants, deepening their connection to the narrative.</p>
    <p>Ultimately, regardless of the medium, the core principles of storytelling remain: a clear plot, relatable characters (or concepts), conflict, and resolution. Digital media simply provides a richer, more dynamic toolkit for bringing these stories to life and sharing them with a global audience.</p>
  `,
    author: "Maria Rodriguez",
    date: "June 20, 2025",
    category: "Arts",
    imageURL: "https://placehold.co/600x400/A78BFA/FFFFFF?text=Storytelling"
  },
  {
    title: "Sustainable Living: Small Changes, Big Impact",
    slug: "sustainable-living-small-changes-big-impact",
    excerpt: "Explore practical ways to adopt a more eco-friendly lifestyle, contributing to a healthier planet for all.",
    content: `
    <p>Sustainable living isn't about drastic, overnight changes; it's about making conscious choices that collectively lead to a healthier planet. Even small adjustments to our daily routines can have a significant positive impact on the environment.</p>
    <p>One of the easiest places to start is by reducing waste. Opt for reusable bags, water bottles, and coffee cups. Say no to single-use plastics whenever possible. Composting food scraps can also significantly reduce landfill waste.</p>
    <p>Rethink your consumption habits. Before buying something new, consider if you truly need it. Can you borrow it, repair it, or buy it second-hand? Supporting local businesses also reduces transportation emissions.</p>
    <p>Energy conservation at home is another key area. Unplug electronics when not in use, switch to energy-efficient LED lighting, and consider smart thermostats. Simple habits like turning off lights when leaving a room add up.</p>
    <p>Finally, embrace a plant-rich diet. Reducing meat consumption, even if not going fully vegetarian or vegan, has a substantial environmental benefit due to the resources required for livestock farming. Every small step towards sustainability contributes to a larger, healthier future for our planet.</p>
  `,
    author: "Eco Warrior",
    date: "June 15, 2025",
    category: "Environment",
    imageURL: "https://placehold.co/600x400/FDBA74/FFFFFF?text=Sustainability"
  },
  {
    title: "Demystifying Quantum Computing",
    slug: "demystifying-quantum-computing",
    excerpt: "An accessible introduction to the complex world of quantum computing and its potential to reshape technology.",
    content: `
    <p>Quantum computing sounds like something out of science fiction, but it's a rapidly developing field with the potential to solve problems currently intractable for even the most powerful supercomputers. At its core, quantum computing leverages the principles of quantum mechanics to process information in fundamentally new ways.</p>
    <p>Traditional computers use bits, which can be either 0 or 1. Quantum computers use qubits, which can be 0, 1, or both simultaneously (a state known as superposition). This allows quantum computers to process vast amounts of information in parallel.</p>
    <p>Another key concept is entanglement, where two or more qubits become linked, meaning the state of one instantly affects the state of the others, no matter the distance. This enables complex calculations and correlations.</p>
    <p>While still in its early stages, quantum computing holds immense promise for fields like drug discovery, material science, financial modeling, and cryptography. It could accelerate the development of new medicines, design more efficient solar cells, and even break current encryption methods.</p>
    <p>However, building stable and scalable quantum computers is an enormous engineering challenge. Qubits are incredibly fragile and easily disrupted by environmental noise. Despite these hurdles, the progress in quantum computing is exciting, paving the way for a future where previously impossible computations become a reality.</p>
  `,
    author: "Dr. Qubit",
    date: "June 12, 2025",
    category: "Technology",
    imageURL: "https://placehold.co/600x400/81E6D9/FFFFFF?text=Quantum+Comp"
  },
  {
    title: "Travel Hacking: Maximizing Your Adventures",
    slug: "travel-hacking-maximizing-your-adventures",
    excerpt: "Unlock the secrets to affordable travel, from finding cheap flights to optimizing loyalty programs.",
    content: `
    <p>Travel hacking is the art of maximizing travel rewards, discounts, and strategies to travel more for less. It's not about illegal activities, but rather about smartly leveraging credit card points, loyalty programs, and flight deals to turn dream vacations into reality without breaking the bank.</p>
    <p>One of the cornerstones of travel hacking is credit card rewards. Many travel-focused credit cards offer generous sign-up bonuses in points or miles, which can be redeemed for flights, hotel stays, or even cash back. Understanding how to earn and redeem these points effectively is key.</p>
    <p>Flight deals are another major component. Tools like Google Flights, Skyscanner, and various flight deal alert services can help you find incredibly cheap fares by tracking price drops and identifying error fares. Flexibility with travel dates and destinations can unlock significant savings.</p>
    <p>Hotel loyalty programs can also provide immense value. By consistently staying with one hotel chain, you can earn free nights, elite status, and perks like room upgrades and late check-outs. Combining hotel points with credit card transfers can lead to luxurious stays at minimal cost.</p>
    <p>Beyond points and miles, travel hacking involves smart budgeting, utilizing travel insurance, and understanding local transportation. It's a continuous learning process, but for those who master it, the world truly opens up as an accessible playground.</p>
  `,
    author: "Wanderlust Guru",
    date: "June 8, 2025",
    category: "Travel",
    imageURL: "https://placehold.co/600x400/BAC4E2/FFFFFF?text=Travel+Hack"
  },
  {
    title: "The Science Behind a Good Night's Sleep",
    slug: "the-science-behind-a-good-nights-sleep",
    excerpt: "Understand the biological processes of sleep and discover techniques to improve your sleep quality for better health.",
    content: `
    <p>Sleep is far more than just a period of rest; it's a vital biological process crucial for our physical and mental health. Understanding the science behind a good night's sleep can help us optimize our habits for better well-being.</p>
    <p>Our bodies operate on a circadian rhythm, an internal 24-hour clock that regulates our sleep-wake cycle. This rhythm is heavily influenced by light and darkness. Exposure to natural light during the day helps reinforce a healthy circadian rhythm, while avoiding bright lights (especially blue light from screens) before bed can promote melatonin production, the sleep hormone.</p>
    <p>Sleep itself is divided into stages: NREM (Non-Rapid Eye Movement) and REM (Rapid Eye Movement). NREM sleep involves deep, restorative sleep crucial for physical recovery and memory consolidation. REM sleep is characterized by vivid dreaming and is important for emotional processing and learning.</p>
    <p>Lack of quality sleep can have serious consequences, including impaired cognitive function, weakened immune system, increased risk of chronic diseases, and mood disturbances. Prioritizing sleep is not a luxury, but a necessity.</p>
    <p>To improve sleep quality, establish a consistent sleep schedule, create a dark and cool sleep environment, limit caffeine and alcohol intake, and incorporate relaxation techniques before bed. Understanding the science empowers us to make informed choices for better rest and overall health.</p>
  `,
    author: "Sleep Scientist",
    date: "June 1, 2025",
    category: "Wellness",
    imageURL: "https://placehold.co/600x400/C1D5E0/FFFFFF?text=Sleep+Science"
  },
]
let blogs2 = [
  {
    "title": "The Rise of Remote Work Culture",
    "slug": "the-rise-of-remote-work-culture",
    "excerpt": "How remote work is reshaping the modern workplace and what it means for productivity, work-life balance, and global collaboration.",
    "content": "<p>Remote work has evolved from a niche perk to a global movement. Driven by technology and accelerated by the pandemic, it has transformed where and how we work. From asynchronous communication to digital collaboration tools, businesses are rethinking office dynamics.</p><p>Employees are enjoying newfound flexibility, while companies are accessing a wider talent pool. However, remote work also presents challenges such as isolation, blurred boundaries, and the need for effective digital leadership.</p><p>The future of work is hybrid. Employers must now design policies that balance freedom with structure, and prioritize mental health, community, and results over hours logged.</p>",
    "author": "Taylor Morgan",
    "date": "July 28, 2025",
    "category": "Business",
    "imageURL": "https://placehold.co/600x400/7DD3FC/FFFFFF?text=Remote+Work"
  },
  {
    "title": "Urban Gardening for Beginners",
    "slug": "urban-gardening-for-beginners",
    "excerpt": "Discover how to grow fresh herbs and vegetables in small urban spaces, from balconies to window sills.",
    "content": "<p>Urban gardening is gaining traction among city dwellers looking for a touch of greenery in their concrete surroundings. With the right setup, even small spaces can yield a surprising harvest.</p><p>Start with easy plants like basil, cherry tomatoes, or lettuce. Use containers with good drainage and place them where they get plenty of sunlight. Recycled materials and vertical gardening solutions help optimize space.</p><p>Gardening not only provides fresh produce but also boosts mental health and fosters sustainable living in the heart of the city.</p>",
    "author": "Nina Patel",
    "date": "July 26, 2025",
    "category": "Environment",
    "imageURL": "https://placehold.co/600x400/A7F3D0/FFFFFF?text=Urban+Garden"
  },
  {
    "title": "Building Financial Resilience in Uncertain Times",
    "slug": "building-financial-resilience-in-uncertain-times",
    "excerpt": "Practical strategies for managing personal finances during economic instability.",
    "content": "<p>In a volatile economy, financial resilience is key. It’s about having the flexibility and resources to weather life’s unexpected turns without compromising long-term stability.</p><p>Start with an emergency fund—aim for 3 to 6 months of essential expenses. Cut unnecessary costs, diversify income sources, and avoid high-interest debt.</p><p>Educate yourself on basic investing, budgeting tools, and how to adapt your financial goals to shifting priorities. Financial literacy is empowerment.</p>",
    "author": "Jordan Blake",
    "date": "July 24, 2025",
    "category": "Finance",
    "imageURL": "https://placehold.co/600x400/FDE68A/FFFFFF?text=Finance"
  },
  {
    "title": "Exploring the Nordic Design Philosophy",
    "slug": "exploring-the-nordic-design-philosophy",
    "excerpt": "Simplicity, functionality, and connection to nature—why Nordic design continues to influence global aesthetics.",
    "content": "<p>Nordic design, rooted in Scandinavian values, emphasizes clean lines, minimalism, and practical beauty. It draws inspiration from the natural world, promoting calm, order, and comfort.</p><p>Whether it’s a piece of furniture, a home interior, or a digital interface, Nordic design aims to make life easier and more beautiful. It’s sustainable, user-centric, and timeless.</p><p>As more people seek simplicity and authenticity in design, Nordic principles offer a refreshing, meaningful approach to living and creating.</p>",
    "author": "Elin Svensson",
    "date": "July 22, 2025",
    "category": "Design",
    "imageURL": "https://placehold.co/600x400/DDD6FE/FFFFFF?text=Nordic+Design"
  },
]
let blogs3 = [
  {
    "title": "How to Start a Podcast from Scratch",
    "slug": "how-to-start-a-podcast-from-scratch",
    "excerpt": "A step-by-step guide to launching your own podcast, from equipment to promotion.",
    "content": "<p>Podcasting is one of the fastest-growing forms of media today. Whether you're passionate about a niche topic or want to grow your brand, starting a podcast can be a powerful platform for your voice.</p><p>You’ll need a good microphone, editing software, and a quiet space. Plan your format, outline episodes, and choose a podcast host platform. Consistency and quality are more important than perfection.</p><p>Promote your podcast through social media, SEO, and collaboration with other creators. Stay authentic and let your voice grow organically.</p>",
    "author": "Lena Cruz",
    "date": "July 20, 2025",
    "category": "Media",
    "imageURL": "https://placehold.co/600x400/FB923C/FFFFFF?text=Podcast+Tips"
  },
  {
    "title": "The Psychology of Color in Branding",
    "slug": "the-psychology-of-color-in-branding",
    "excerpt": "Uncover how color choices influence perception, emotion, and consumer behavior.",
    "content": "<p>Color is a powerful communicator in branding. It can trigger emotions, shape brand identity, and influence purchasing decisions. For example, blue conveys trust, red evokes urgency, and green symbolizes growth.</p><p>Successful brands use color strategically. Consider the cultural and psychological implications of color when designing logos, packaging, and websites. Consistency is key.</p><p>Understanding the psychology of color helps businesses create a visual identity that resonates deeply with their target audience.</p>",
    "author": "Ravi Singh",
    "date": "July 18, 2025",
    "category": "Marketing",
    "imageURL": "https://placehold.co/600x400/FCA5C5/FFFFFF?text=Color+Psych"
  },
  {
    "title": "Digital Nomad Life: Pros and Cons",
    "slug": "digital-nomad-life-pros-and-cons",
    "excerpt": "What it's really like to live and work from anywhere in the world.",
    "content": "<p>The digital nomad lifestyle offers unparalleled freedom—traveling the world while working remotely. But it also comes with unique challenges.</p><p>Pros include flexibility, adventure, and the ability to create your ideal work environment. Cons? Loneliness, visa issues, inconsistent Wi-Fi, and lack of routine.</p><p>Success as a digital nomad requires discipline, planning, and adaptability. It's not for everyone, but for some, it’s the ultimate dream come true.</p>",
    "author": "Maya Torres",
    "date": "July 16, 2025",
    "category": "Travel",
    "imageURL": "https://placehold.co/600x400/B9FBC0/FFFFFF?text=Digital+Nomad"
  },
  {
    "title": "Intro to Blockchain Beyond Cryptocurrency",
    "slug": "intro-to-blockchain-beyond-cryptocurrency",
    "excerpt": "Explore how blockchain is being used for more than just Bitcoin.",
    "content": "<p>Blockchain technology powers cryptocurrencies, but its applications go far beyond digital money. It offers a decentralized, tamper-proof way to record and verify transactions.</p><p>Industries from supply chain management to healthcare are exploring blockchain for transparency and security. Smart contracts can automate agreements, and digital identities can increase privacy and control.</p><p>While the tech is still maturing, blockchain could play a central role in the future of data, trust, and security.</p>",
    "author": "Noah Kim",
    "date": "July 14, 2025",
    "category": "Technology",
    "imageURL": "https://placehold.co/600x400/93C5FD/FFFFFF?text=Blockchain"
  },
]
let blogs4 = [
  {
    "title": "Mastering the Art of Public Speaking",
    "slug": "mastering-the-art-of-public-speaking",
    "excerpt": "Gain confidence and captivate any audience with these practical tips.",
    "content": "<p>Public speaking is a skill anyone can develop. Preparation, practice, and presence are the keys to speaking confidently and effectively.</p><p>Start with knowing your audience and defining your core message. Use stories to engage, vary your tone and pace, and maintain eye contact. Avoid filler words and focus on clarity.</p><p>Stage fright is normal. Rehearse often, breathe deeply, and remember—it’s about them, not you.</p>",
    "author": "Emily Wright",
    "date": "July 12, 2025",
    "category": "Personal Development",
    "imageURL": "https://placehold.co/600x400/F9A8D4/FFFFFF?text=Public+Speaking"
  },
  {
    "title": "AI in Healthcare: Transforming Patient Outcomes",
    "slug": "ai-in-healthcare-transforming-patient-outcomes",
    "excerpt": "From diagnostics to personalized medicine, AI is reshaping modern healthcare.",
    "content": "<p>Artificial intelligence is revolutionizing healthcare. Algorithms can now analyze medical data with astonishing speed and accuracy, aiding early diagnosis and personalized treatment plans.</p><p>AI assists in medical imaging, drug development, and predicting patient risks. Chatbots handle preliminary care, while predictive analytics support decision-making.</p><p>However, challenges around ethics, privacy, and bias must be addressed to ensure responsible implementation.</p>",
    "author": "Dr. Laila Ahmed",
    "date": "July 10, 2025",
    "category": "Health",
    "imageURL": "https://placehold.co/600x400/6EE7B7/FFFFFF?text=AI+Health"
  },
  {
    "title": "The Ethics of Artificial Intelligence",
    "slug": "the-ethics-of-artificial-intelligence",
    "excerpt": "How do we ensure that AI development aligns with human values and rights?",
    "content": "<p>As AI systems become more powerful, ethical questions grow. Who is accountable when AI fails? How do we prevent bias in training data?</p><p>Ethical AI must be transparent, fair, and explainable. It should respect privacy, avoid discrimination, and remain under meaningful human control.</p><p>Developers, policymakers, and the public all play a role in shaping an ethical AI future.</p>",
    "author": "Casey Lim",
    "date": "July 8, 2025",
    "category": "Ethics",
    "imageURL": "https://placehold.co/600x400/FDE047/000000?text=AI+Ethics"
  },
  {
    "title": "Making the Most of Your Morning Routine",
    "slug": "making-the-most-of-your-morning-routine",
    "excerpt": "Design a morning routine that sets the tone for a productive and positive day.",
    "content": "<p>A strong morning routine boosts productivity, reduces stress, and builds momentum. The key is intention—plan activities that energize and ground you.</p><p>Common habits include meditation, exercise, journaling, and goal setting. Avoid checking your phone first thing and create space for stillness or reflection.</p><p>Experiment and adjust until your routine feels energizing, not exhausting. Consistency is more important than complexity.</p>",
    "author": "Michelle Grant",
    "date": "July 6, 2025",
    "category": "Wellness",
    "imageURL": "https://placehold.co/600x400/FCD34D/000000?text=Morning+Routine"
  }
]
let blogs5 = [
  {
    "title": "The Evolution of E-commerce in the Post-Pandemic Era",
    "slug": "evolution-of-ecommerce-post-pandemic",
    "excerpt": "From virtual fitting rooms to drone delivery, explore how e-commerce is adapting to a changed consumer landscape.",
    "content": "<p>The pandemic accelerated the shift to online shopping. As physical stores struggled, e-commerce boomed—and it's not slowing down. Innovations like AR try-ons, AI chatbots, and faster delivery systems are redefining the digital shopping experience.</p><p>Customers now expect seamless, personalized, and omnichannel interactions. Businesses that embrace technology and flexibility are thriving, while those clinging to old models risk falling behind.</p><p>The future of retail lies at the intersection of technology, convenience, and customer experience.</p>",
    "author": "Samantha Lowe",
    "date": "July 4, 2025",
    "category": "Business",
    "imageURL": "https://placehold.co/600x400/93C5FD/FFFFFF?text=E-commerce"
  },
  {
    "title": "Creative Writing as a Tool for Self-Discovery",
    "slug": "creative-writing-for-self-discovery",
    "excerpt": "Learn how journaling and storytelling can help you process emotions, clarify thoughts, and uncover personal truths.",
    "content": "<p>Writing is not just a creative outlet—it’s a mirror to the self. Whether through poetry, fiction, or reflective journaling, putting thoughts into words reveals patterns, beliefs, and emotions often hidden beneath the surface.</p><p>Regular writing fosters mindfulness, improves emotional intelligence, and strengthens self-awareness. Prompts can help if you’re unsure where to begin.</p><p>There’s no right or wrong—just honesty, exploration, and the power of your voice.</p>",
    "author": "Jules Moreno",
    "date": "July 2, 2025",
    "category": "Arts",
    "imageURL": "https://placehold.co/600x400/E0E7FF/000000?text=Creative+Writing"
  },
  {
    "title": "Fitness Myths That Could Be Holding You Back",
    "slug": "fitness-myths-holding-you-back",
    "excerpt": "Debunk common fitness misconceptions and build a smarter, more sustainable approach to health.",
    "content": "<p>Many people struggle with fitness because they follow outdated or incorrect advice. No, lifting weights won’t make you bulky overnight. And yes, you can lose fat without endless cardio.</p><p>Effective fitness is based on science and personalization—not fads. Focus on compound movements, progressive overload, and balanced nutrition. Rest and recovery are just as important as your workouts.</p><p>Understanding the truth behind the myths empowers you to train better and avoid burnout or injury.</p>",
    "author": "Coach Reggie",
    "date": "June 30, 2025",
    "category": "Health",
    "imageURL": "https://placehold.co/600x400/FECACA/000000?text=Fitness+Facts"
  },
  {
    "title": "The Role of Sound in User Experience Design",
    "slug": "role-of-sound-in-ux-design",
    "excerpt": "Beyond visuals—how sound enhances emotion, accessibility, and functionality in digital interfaces.",
    "content": "<p>Sound is often an overlooked but powerful element of user experience. Notification tones, feedback clicks, and background ambiance can all guide users, reinforce actions, or create emotional impact.</p><p>Well-designed soundscapes improve usability for visually impaired users and enhance engagement for everyone. But poor audio design can annoy, confuse, or even drive users away.</p><p>In modern UX, audio must be intentional—supporting, not distracting. Sound design deserves as much care as typography or layout.</p>",
    "author": "Aria Novak",
    "date": "June 28, 2025",
    "category": "Design",
    "imageURL": "https://placehold.co/600x400/DDD6FE/000000?text=UX+Sound"
  }
]

const blogArray = [blogs1, blogs2, blogs3, blogs4, blogs5]

function inititalise(userId, blogs) {
  let blogsId = []
  blogs.forEach(blog => {
    blog.userId = userId
  })

  db.posts.insertMany(blogs)
  db.posts.find({}).forEach(blog => {
    blogsId.push(blog._id)
  })
  let user = db.users.findOneAndUpdate(
    { _id: id },
    { $set: { posts: blogsId, role: "admin" } },
    { upsert: true, new: false } // upsert creates, new returns updated doc
  );
  blogsId.forEach(postId => {
    db.posts.findOneAndUpdate(
      { _id: postId },
      { $set: { author: user.name } },
      { upsert: true, new: true } // upsert creates, new returns updated doc
    );
  })
}
// let users = db.users.find({})
// users.forEach((user, index) => {
  // inititalise(user._id, blogArray[index])
// })

// db.users.findOneAndUpdate(
//     { email: "sameersharm1234@gmail.com" },
//     { $set: { role: "admin" } },
//     { upsert: true, new: false } // upsert creates, new returns updated doc)
// )

// console.log(db.users.findOne({ email: "sameersharm1234@gmail.com" }))
// console.log(db.post.findOne({ slug: "top-10-destinations-for-solo-travelers" }))

// db.users.createIndex({ followers: 1 })
// db.users.getIndexes()
// db.users.findOneAndUpdate({email: "test@gmail.com"}, { $set: {following:[]} }, { new: false, runValidators: true })
// db.users.findOneAndUpdate({email: "sameersharm1234@gmail.com"}, { $set: {followers:[]} }, { new: false, runValidators: true })


// db.users.insertMany(mockUsers)
// db.posts.insertMany(mockBlogPosts)
// let i = 0

// mockUsers.forEach(user => {
//   if (user.role !== "spectator") {
//     mockBlogPosts[i, i + 5].forEach(post => {
//       db.users.findOneAndUpdate(
//         { email: user.email },
//         { $push: { posts: post._id } },
//         { upsert: true, new: false }
//       );
//       db.posts.findOneAndUpdate(
//         { slug: post.slug },
//         { $set: { userId: user._id, author: user.name } },
//         { upsert: true, new: false }
//       );
//     })
//     i = i + 5
//   }
// })