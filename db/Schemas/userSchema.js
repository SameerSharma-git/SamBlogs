import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    default: '/images/profile.jpg' // Provide a default image path
  },
  name: {
    type: String,
    required: [true, 'Name is required'], // Name is required
  },
  email: {
    type: String,
    required: [true, 'Email is required'], // Email is required
    unique: true, // Email must be unique
    trim: true, // Trim whitespace from the email
    // Basic email validation using a regex
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'], // Password is required
    minlength: [6, 'Password must be at least 6 characters long'], // Minimum password length
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: "New User"
  },
  role: {
    type: String,
    enum: ['writer', 'admin', 'spectator'], // Example roles
    default: 'writer'
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: []
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: []
    }
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post'
    }
  ]
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps automatically
});

// Create the User model from the schema
const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User