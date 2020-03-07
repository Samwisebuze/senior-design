import * as express from 'express'

const router = express.Router()

// Service Root Path - /machines
// HATEOAS structure to discover the rest of the service.
router.get('', async (req, res, next) => {
    
    res.status(501).json()
});

router.post('', async (req, res, next) => {
    res.status(501).json()
});

router.get('/:networkId', async (req, res, next) => {
    const { networkId } = req.params
    res.status(501).json();
});

router.patch('/:networkId', async (req, res, next) => {
    const { networkId } = req.params
    res.status(501).json()
});

router.delete('/:networkId', async (req, res, next) => {
    const { networkId } = req.params
    res.status(501).json()
});

export default router;