import { renderPictures } from './pictures.js';
import {receivePostsAsync} from './network.js';
import './upload.js';
receivePostsAsync(renderPictures);
