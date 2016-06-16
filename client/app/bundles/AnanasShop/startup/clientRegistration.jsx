import ReactOnRails from 'react-on-rails';
import CartApp from './cartApp';
import FullCartApp from './fullCartApp';
import AddToButton from './addToButtonApp';
import cartStore from '../store/cartStore';

ReactOnRails.registerStore({ cartStore });
ReactOnRails.register({ CartApp, AddToButton, FullCartApp });
