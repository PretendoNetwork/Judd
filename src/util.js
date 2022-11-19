const joi = require('joi');

const joiExtended = joi.extend((joi) => {
	return {
		type: 'emptystringtonum',
		base: joi.number(),
		messages: {
			'emptystringtonum.base': '{{#label}} must be an empty string',
		},
		coerce(value, helpers) {
			if (value !== '') {
				return { value: 0, errors: helpers.error('emptystringtonum.base') }
			}

			return { value: 0 }
		},
	}
});

joiExtended.numberstring = () => {
	return joi.alternatives(
		joiExtended.emptystringtonum(),
		joi.number(),
	)
};

module.exports = {
	joi: joiExtended
};