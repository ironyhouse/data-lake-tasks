import express, { Request, Response } from 'express';
import { enterprisesService } from './enterprisesService';
import { AddUsersParams } from './types';

const PORT = 3000;
const app = express();

// Middleware for JSON body parsing
app.use(express.json());

app.post('/enterprise/users/add', async (req: Request, res: Response) => {
  try {
    const { userHashes, taxId, permissions }: AddUsersParams = req.body;

    // Check if all required parameters are present
    if (!userHashes || !Array.isArray(userHashes) || userHashes.length === 0) {
      return res
        .status(400)
        .json({ error: 'userHashes must be a non-empty array' });
    }

    if (!taxId) {
      return res.status(400).json({ error: 'taxId is required' });
    }

    if (
      !permissions ||
      !Array.isArray(permissions) ||
      permissions.length === 0
    ) {
      return res
        .status(400)
        .json({ error: 'permissions must be a non-empty array' });
    }

    // Call the addUsers function from enterprisesService
    await enterprisesService.addUsers(userHashes, taxId, permissions);

    // Send success response
    return res
      .status(200)
      .json({ message: 'Users added to enterprise successfully' });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error adding users to enterprise:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
