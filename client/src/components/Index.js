import React, { Component } from 'react'
import debounce from "lodash.debounce";
import Products from '../http/Resources'
import GridBody from './GridBody'

class Index extends Component{
	constructor (props)
	{
		super(props)
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

	componentWillMount(){
		var vm =this;
		this.handleProduct()
		window.addEventListener('scroll', debounce(this.pageScroll, 100));
	}

	componentWillUnmount() {
	   window.removeEventListener('scroll', debounce(this.pageScroll, 100));
	}

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