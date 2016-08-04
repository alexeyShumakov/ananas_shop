import ReactOnRails from 'react-on-rails';
import CartApp from './cartApp';
import FullCartApp from './fullCartApp';
import FullProduct from './fullProduct';
import Showcase from './showcaseApp'
import AddToButton from './addToButtonApp';
import cartStore from '../store/cartStore';
import NavbarProductSearch from '../components/NavbarProductSearch';
import AppBanner from '../components/AppBanner';

ReactOnRails.registerStore({ cartStore });
ReactOnRails.register({ Showcase, CartApp, AddToButton, AppBanner, FullCartApp, FullProduct, NavbarProductSearch });
