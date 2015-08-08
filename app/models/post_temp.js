'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * A Validation function for local strategy properties
 */
var validateProperty = function(property) {
	return (!this.updated || property.length);
};

/**
 * DuanzuPost Schema
 */
var DuanzuPostSchema = new Schema({
	// DuanzuPost model fields   
	title: {
        type: String,
        trim: true,
        default: '',
        validate: [validateProperty, '请填写标题']
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
        validate: [validateProperty, '请填写小区名']
    },
    price: {
        type: String,
        trim: true,
        default: '',
        validate: [validateProperty, '请填写价格']
    },
    phone: {
        type: String,
        trim: true,
        default: '',
        validate: [validateProperty, '请填写手机号码']
    },
    wechat: {
        type: String,
        trim: true,
        default: '',
        validate: [validateProperty, '请填写微信号']
    },
    description: {
        type: String,
        trim: true,
        default: '',
        validate: [validateProperty, '请填写描述']
    },
    updated: {
        type: Date,
        default: Date.now
    }
    user: {
		type: Schema.ObjectId,
		ref: 'User'
	}    
});

mongoose.model('DuanzuPost', DuanzuPostSchema);