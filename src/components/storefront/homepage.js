import classes from "./store.module.css"
import logo from "./media/logo.jpg"
import cart from "./media/cart.png"
import showcase from "./media/showcase.jpeg"
import product1 from "./media/prod1.jpg"
import product2 from "./media/prod2.jpg"
import product3 from "./media/prod3.png"
import heart from "./media/hearts.png" 
export function Store(){
    return(
        <div id={classes.page}>
            <Navigation></Navigation>
            <Feature></Feature>
            
            <Product image={product1} name="sample" price ="25.99"></Product>
        </div>
    )
}
function Navigation(){
    return(
        <div id={classes.navbar}>
            <img id={classes.logo} src={logo}></img>
            <div id={classes.links}>
            <p>FAQ</p>
            <p>Shop</p>
            <p>About</p>
            </div>
            <img id={classes.cart} src={cart}></img>
        </div>  
    )
}

function Feature (){
    
    return(
        <div>
            <h1 style={{textAlign:"center", color:"#F01D7F"}}>Order Custom Press On Nails</h1>
            <div className={classes.banner}>
                <img id={classes.showcase} src={showcase}></img>
                <button id={classes.orderBtn}>Order</button>
            </div>
        </div>
    )
}
function Product(props){
    var reviews = <span className={classes.feedback}>
        <span>
        <img className={classes.reviewHearts} src={heart}/>
        <img className={classes.reviewHearts} src={heart}/>
        <img className={classes.reviewHearts} src={heart}/>
        <img className={classes.reviewHearts} src={heart}/>
        <img className={classes.reviewHearts} src={heart}/>
        </span>
        <p>(5)</p>
        </span>
    return(
        <div className={classes.product}>
            <img className={classes.productImage} src={props.image}></img>
            {reviews}
            <p>{props.name}</p>
            <p>{props.price}</p>
        </div>
    )
}

