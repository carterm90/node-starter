const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const slugs = require('slugs')

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            required: 'You must supply coordinates!'
        }],
        address: {
            type: String,
            required: 'You must supply an address'
        }
    },
})

storeSchema.pre('save', function(next) {
    if (!this.isModified('name')) {
        return next() // skip it
    }
    this.slug = slugs(this.name)
    next()
})

module.exports = mongoose.model('Store', storeSchema)