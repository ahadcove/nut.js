import {Image} from "../image.class";
import {DataSinkInterface} from "./data-sink.interface";

export interface ImageWriterParameters {
    data: Image,
    path: string
}

export type ImageWriter = DataSinkInterface<ImageWriterParameters, void>;
