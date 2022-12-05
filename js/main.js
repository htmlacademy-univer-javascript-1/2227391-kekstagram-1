import { renderPictures } from './pictures.js';
import {receivePostsAsync} from './network.js';
import './upload.js';
import {closeEditor} from './upload.js';
closeEditor();
receivePostsAsync(renderPictures);
