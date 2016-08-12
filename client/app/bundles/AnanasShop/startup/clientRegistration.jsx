import ReactOnRails from 'react-on-rails';
import CartApp from './cartApp';
import FullCartApp from './fullCartApp';
import MyProfile from './myProfile';
import MyOrders from './myOrders';
import FullProduct from './fullProduct';
import Showcase from './showcaseApp'
import AddToButton from './addToButtonApp';
import cartStore from '../store/cartStore';
import NavbarProductSearch from '../components/NavbarProductSearch';
import AppBanner from '../components/AppBanner';
import IndexProducts from './indexPageProducts'

ReactOnRails.registerStore({ cartStore });
let components = {
  Showcase, MyProfile, MyOrders, CartApp, AddToButton,
  AppBanner, FullCartApp, FullProduct, NavbarProductSearch,
  IndexProducts
}
ReactOnRails.register(components);
