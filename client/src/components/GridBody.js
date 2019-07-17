import React from 'react'
import { centsToUSD } from '../http/currencyConverter'
import { dateTimeFormatter } from '../http/date'
import API_BASE_PATH from '../http/url'

const GridBody = props => {
	const ProductDisplay = [];
	const Products = props.characterData;
	var rows = Products.forEach((row, index)=>{
		ProductDisplay.push(
    		<div className="col-md-4 col-sm-6 col-xs-12 mb-4" key={index}>
    		<div className="card bg-light text-dark uni-card" >
		      	<div className="card-body">
			        <p style={{ fontSize:row.size,fontWeight:700 }} className="text-center card-title">{row.face}</p>
			        <p className="card-text text-center">{dateTimeFormatter(row.date)}</p>
			        <p className="card-text text-center">${centsToUSD(row.price)}</p>        
		      	</div>
	      	</div>
	      	</div>
    	)

	    if((index + 1) % 20 === 0){
	    	ProductDisplay.push(
	    	<div className="col-md-4 col-sm-6 col-xs-12 mb-4">
	    	<div className="card bg-light text-dark uni-card" >
		      	<div className="card-body">
			        <img src={`${API_BASE_PATH}/ads/?r=${Math.floor(Math.random()*1000)}`} style={{height:"150px", width:"320px", margin:"auto"}} className="img-responsive img-thumbnail"/>
		      	</div>
		    </div>
		    </div>
		    )
	    }
	})
	    return (
		   
		      ProductDisplay
		    
	    )
}

export default GridBody