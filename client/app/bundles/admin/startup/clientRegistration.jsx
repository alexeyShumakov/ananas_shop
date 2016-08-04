import ReactOnRails from 'react-on-rails';
import Sidebar from './sidebar';
import Product from './product';
import Banners from './banners';
import adminStore from '../store/adminStore';

ReactOnRails.registerStore({ adminStore });
ReactOnRails.register({ Sidebar, Product, Banners });
