import * as express from 'express';

const router = express.Router();

// Service Root Path - /
// HATEOAS structure to discover the rest of the service.
router.get('/', async (req, res, next) => {
    res.status(501).json();
});

export default router;