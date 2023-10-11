import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import {
    Typography,
    Button,
    Grid,
    Paper,
    IconButton,
    Card,
    CardMedia,
    CardContent,
    CardActions,
} from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: theme.spacing(2),
    },
    content: {
        flex: "1 0 auto",
    },
    cover: {
        width: 100,
    },
    actions: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
}));

const Cart = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    };

    return (
        <div className="container mx-auto py-4">
            <Typography variant="h4" className="text-center mb-4">
                Your Shopping Cart
            </Typography>

            {cartItems.length === 0 ? (
                <div className="text-center mt-8">
                    <RemoveShoppingCartIcon className="text-6xl text-gray-500" />
                    <Typography variant="h5" className="text-gray-600 mt-4">
                        Your cart is empty.
                    </Typography>
                    <Link
                        to="/books"
                        className="text-blue-500 hover:underline mt-2"
                    >
                        Explore Books
                    </Link>
                </div>
            ) : (
                <Fragment>
                    {cartItems.map((item) => (
                        <Card key={item.book} className={classes.root}>
                            <CardMedia
                                className={classes.cover}
                                image={item.image}
                                title={item.name}
                            />
                            <div className={classes.content}>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {item.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Price: ₹{item.price}
                                    </Typography>
                                    <div>
                                        <IconButton
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.book,
                                                    item.quantity
                                                )
                                            }
                                            color="primary"
                                        >
                                            -
                                        </IconButton>
                                        <span>{item.quantity}</span>
                                        <IconButton
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.book,
                                                    item.quantity,
                                                    item.stock
                                                )
                                            }
                                            color="primary"
                                        >
                                            +
                                        </IconButton>
                                    </div>
                                </CardContent>
                                <CardActions className={classes.actions}>
                                    <Typography variant="body1">
                                        Subtotal: ₹{item.price * item.quantity}
                                    </Typography>
                                    <Button
                                        size="small"
                                        color="secondary"
                                        onClick={() =>
                                            deleteCartItems(item.book)
                                        }
                                    >
                                        Remove
                                    </Button>
                                </CardActions>
                            </div>
                        </Card>
                    ))}
                    <Paper elevation={3} className="p-4 rounded-lg">
                        <Typography variant="h6" className="font-semibold">
                            Gross Total
                        </Typography>
                        <Typography variant="h5" className="font-semibold">
                            ₹
                            {cartItems.reduce(
                                (acc, item) => acc + item.quantity * item.price,
                                0
                            )}
                        </Typography>
                    </Paper>
                    <div className="mt-4">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={checkoutHandler}
                            className="w-full"
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default Cart;
