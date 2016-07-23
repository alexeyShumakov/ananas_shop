import ReactOnRails from 'react-on-rails';
import Sidebar from './sidebar';
import adminStore from '../store/adminStore';

ReactOnRails.registerStore({ adminStore });
ReactOnRails.register({ Sidebar });
