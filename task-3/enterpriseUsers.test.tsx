import request from 'supertest';
import app from './index';

describe('POST /enterprise/users/add', () => {
  it('should return 400 if taxId is not provided', async () => {
    const res = await request(app)
      .post('/enterprise/users/add')
      .send({
        userHashes: ['0xHash1', '0xHash2'],
        permissions: ['perm1', 'perm2'],
      });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'taxId is required' });
  });

  it('should return 400 if userHashes is not provided or is an empty array', async () => {
    const res = await request(app)
      .post('/enterprise/users/add')
      .send({
        taxId: '7162828483',
        userHashes: [],
        permissions: ['perm1', 'perm2'],
      });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'userHashes must be a non-empty array' });
  });

  it('should return 400 if permissions is not provided or is an empty array', async () => {
    const res = await request(app)
      .post('/enterprise/users/add')
      .send({
        taxId: '7162828483',
        userHashes: ['0xHash1', '0xHash2'],
        permissions: [],
      });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: 'permissions must be a non-empty array',
    });
  });

  it('should return 200 and success message if all parameters are provided', async () => {
    const res = await request(app)
      .post('/enterprise/users/add')
      .send({
        taxId: '7162828483',
        userHashes: ['0xHash1', '0xHash2'],
        permissions: ['perm1', 'perm2'],
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Users added to enterprise successfully',
    });
  });
});

describe('GET /enterprise/users', () => {
  it('should return enterprise users without taxId query parameter', async () => {
    const resNoTaxId = await request(app).get('/enterprise/users');
    expect(resNoTaxId.status).toBe(200); // Adjust the status code as per your API response
    // Add assertions
  });

  it('should return enterprise users based on taxId query parameter', async () => {
    const taxId = '7162828483';
    const res = await request(app).get(`/enterprise/users?taxId=${taxId}`);
    expect(res.status).toBe(200);
    // expect(response.body.every(obj => obj instanceof User)).toBe(true);
  });

  it('should return an error for an invalid taxId query parameter', async () => {
    const resInvalid = await request(app).get(
      '/enterprise/users?taxId=invalid'
    );
    expect(resInvalid.status).toBe(400); // Assuming 400 is the error status code for invalid taxId
    expect(resInvalid.body.error).toBe('Invalid taxId');
  });
});
