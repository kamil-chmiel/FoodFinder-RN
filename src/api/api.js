import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer TGS7n4WCDLdHOzy5BNMnzid92pBCAfPM0_CTLn0jlGarzAXiu2M7vEKZSTq_T0P7ty7w2u6wDTeCRkFL-kU3yfD3w0HqCdA1x6JlXA4kHkWuJ9PH5l0R3dJPmL6EXXYx'
    }
})