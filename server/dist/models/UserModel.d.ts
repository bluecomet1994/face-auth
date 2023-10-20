import * as mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    name: string;
    date: Date;
    email: string;
    password: string;
    faceDescriptor: any[];
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    date: Date;
    email: string;
    password: string;
    faceDescriptor: any[];
}> & Omit<{
    name: string;
    date: Date;
    email: string;
    password: string;
    faceDescriptor: any[];
} & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    date: Date;
    email: string;
    password: string;
    faceDescriptor: any[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    date: Date;
    email: string;
    password: string;
    faceDescriptor: any[];
}>> & Omit<mongoose.FlatRecord<{
    name: string;
    date: Date;
    email: string;
    password: string;
    faceDescriptor: any[];
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;
export default _default;
