import ReactOnRails from 'react-on-rails';
import Sidebar from './sidebar';
import Product from './product';
import Banners from './banners';
import Order from './order';
import Statuses from './statuses';
import adminStore from '../store/adminStore';

ReactOnRails.registerStore({ adminStore });
ReactOnRails.register({ Statuses, Sidebar, Product, Banners, Order });
