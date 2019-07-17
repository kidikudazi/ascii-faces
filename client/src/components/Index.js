import React, { Component } from 'react'
import debounce from "lodash.debounce";
import Products from '../http/Resources'
import GridBody from './GridBody'

class Index extends Component{
	constructor (props)
	{
		super(props)

		// declare all state's that will be used
		this.state={
			_page:1,
			_limit:20,
			_sort:null,
			product:[],
			isLoading:true,
			loader:{
				display:"block"
			},
			noMoreProduct:{
				display:"none"
			}
		}
	}

	// initalizes basic operations the on page
	componentWillMount(){
		var vm =this;
		this.handleProduct()
		window.addEventListener('scroll', debounce(this.pageScroll, 100));
	}

	componentWillUnmount() {
	   window.removeEventListener('scroll', debounce(this.pageScroll, 100));
	}

	// handles all basic operations to fetch products
	handleProduct = ()=>{
		var vm = this;
		Products.getAllProduct(vm.state._page, vm.state._limit, vm.state._sort)
		.then(res=>{
			if(res.data.length > 0){

				for (var i = 0; i < res.data.length; i++) {
					vm.setState({product:[...this.state.product , res.data[i]], loader:{display:"none"}})
				}
				vm.setState({isLoading:false});

			}else{
				vm.setState({loader:{display:"none"}});
				vm.setState({isLoading:false});
				vm.setState({noMoreProduct:{display:"block"}});
			}
		})
	}

	// carry out scroll event to load more product
	pageScroll = () =>{
		const preloadOffset = 4000;
	    const scrollHeight = document.body.scrollHeight;
	    const scrollPosition = window.scrollY + window.innerHeight;
	    const isAtBottom = (scrollPosition + preloadOffset) >= scrollHeight;

	    if (isAtBottom && !this.state.isLoading) {
	      this.setState({loader:{display:'block'}});
		  this.setState({isLoading:true});

	      var incPage = this.state._page+ 1
	      this.setState({_page: incPage	});
	      this.handleProduct();
	    }
	}

	//sort product based on selected sort order
	sortData = event=>{
		this.setState({product:[], loader:{display:"block"}, isLoading:true});
		if(event.target.value != null || event.target.value != ''){

			this.state._sort = event.target.value;
			this.setState({_sort:event.target.value})
			this.handleProduct();
		}
	}

	render(){
		return (
			<div>
				<header>
				<nav className="navbar navbar-expand-sm bg-primary navbar-light mb-5 fixed-top">
				  <a className="navbar-brand text-white" href="#">Ascii Faces Shop</a>
				</nav>
				</header>
				<br/><br/><br/><br/><br/>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-2 offset-md-10 mb-2">
						    <select className="form-control" onChange={this.sortData}>
						    	<option value="">Sort By</option>
						    	<option value="id">Id</option>
						    	<option value="price">Price</option>
						    	<option value="size">Size</option>
						    </select>
						</div>
					</div>
					<div className="row">
						<GridBody characterData={this.state.product}/>
					</div>
				</div>
				<div className="col-md-12">
					<center><div className="spinner-border text-primary text-center" style={this.state.loader}></div>Loading....</center>
				</div>
				<div className="col-md-12">
					<center><p className="text-info" style={this.state.noMoreProduct}>No More Products.</p></center>
				</div>
			</div>
		)
	}
}


export default Index