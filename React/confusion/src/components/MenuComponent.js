import React, { Component } from 'react';
import { CardBody } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
        console.log('Menu Component Constructor is Invoked');
    }

    componentDidMount(){
        console.log('Menu Component ComponentDidMount is Invoked');
    }

    onDishSelect(dish){
        this.setState({selectedDish: dish});
    }

    renderDish(dish){
        if(dish != null){
            return(
                <Card>
                    <CardImg width="100%" src= {dish.image} alt={dish.name}/> 
                    <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return (
                <div></div>
            )
        }
    }

    render() {
        const menu = this.props.dishes.map((dish)=> {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                            <CardImg width="100%" src= {dish.image} alt={dish.name}/> 
                        <CardImgOverlay >
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        console.log('Menu Component Render is Invoked');
     


        return (
          <div className="container">
            <div className="row">       
                  {menu}
            </div>
            <DishDetail dish={this.state.selectedDish} />
          </div>
        );
    }
}

export default Menu;