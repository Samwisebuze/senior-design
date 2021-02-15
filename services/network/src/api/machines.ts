import * as express from 'express';

const router = express.Router();

// GET - Machine Collection
// Request Params:
//  - networkId: Guid - Id of parent network
// Query Params:
// Response:
//  Header: X-Pagination
//  Body: An Array of Machines
router.get('', async (req, res, next) => {
    res.status(501).json();
});

router.post('', async (req, res, next) => {
    res.status(501).json();
});

router.get('/:machineId', async (req, res, next) => {
    res.status(501).json();
});

router.patch('/:machineId', async (req, res, next) => {
    res.status(501).json();
});

router.delete('/:machineId', async (req, res, next) => {
    res.status(501).json();
});



export default router;