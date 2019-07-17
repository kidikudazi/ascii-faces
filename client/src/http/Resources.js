/**
* General Resources page
*/
import API from './config';

class Resources{
	/**
	* fetch all ascii products
	*/
	static getAllProduct(_page = 1, _limit = 10, _sort = null){
		const params = { _page, _limit };
		 if (_sort != null) {
	      params._sort = _sort;
	    }
	    return API.get('/products', { params })
	}
}

export default Resources