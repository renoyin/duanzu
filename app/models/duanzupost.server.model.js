'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Duanzupost Schema
 */
var DuanzupostSchema = new Schema({
    
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