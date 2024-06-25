import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

const validationSchema = {
  admin: ajv.compile({
    type: 'object',
    properties: {
      loginDisabled: { type: 'boolean' },
      requirePasswordUpdate: { type: 'boolean', default: true }
    },
    required: ['loginDisabled'],
    additionalProperties: false
  }),
  user: ajv.compile({
    type: 'object',
    properties: {
      loginDisabled: { type: 'boolean' },
      requirePasswordUpdate: { type: 'boolean', default: true }
    },
    required: ['loginDisabled'],
    additionalProperties: false
  })
};

const metadataManager: any = {
  admin: (data: any) => {
    return validationSchema.admin(data);
  },
  user: (data: any) => {
    return validationSchema.user(data);
  }
};

export default metadataManager;
