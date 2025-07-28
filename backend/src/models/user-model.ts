import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, required: true},
    avatarURL: {
        type: String,
        default: ''
    },

    // ✅ Optional fields for streaming platforms:
    subscription: {
        type: String, // e.g., 'free', 'premium', 'family'
        default: 'free'
    },
    role: {
        type: String, // 'user', 'admin', 'creator'
        default: 'user'
    },
    profiles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile' // For managing multiple profiles per user (like Netflix)
    }],
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media' // Tracks watched movies/series
    }],
    watchlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media' // Saved for later
    }],
    liked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'
    }]
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema)