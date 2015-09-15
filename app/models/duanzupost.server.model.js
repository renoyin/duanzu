'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Validation
 */
function validateLength(content) {
    return content.length <= 40;
}

/**
 * Duanzupost Schema
 */
var DuanzupostSchema = new Schema({
    
    title: {
        type: String,
        trim: true,
        default: '',
        required: '请填写标题',
        validate: [validateLength, 'title must be 40 characters in length or less']
    },
    startDate: {
        type: String,
        trim: true,
        default: '',
    },
    endDate: {
        type: String,
        trim: true,
        default: '',
    },
    community: {
        type: String,
        trim: true,
        default: '',
        required: '请填写小区名',
        validate: [validateLength, 'must be 40 characters in length or less']
    },
    price: {
        type: String,
        trim: true,
        default: '',
        required: '请填写价格'
    },
    phone: {
        type: String,
        trim: true,
        default: '',
        required: '请填写手机号码'
    },
    description: {
        type: String,
        trim: true,
        default: '',
        required: '请填写描述'
    },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Duanzupost', DuanzupostSchema);