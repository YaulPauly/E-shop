'use client';

import Heading from "@/app/components/Heading";
import { Avatar, Rating } from "@mui/material";
import moment from "moment";

interface ListRatingProps {
    product: any
}

interface Ireview {
    id: string,
    userId: string,
    productId: string,
    rating: number,
    comment: string,
    createdDate: string,
    user: Iuser
}

interface Iuser {
    id: string,
    name: string,
    email: string,
    emailVerified?: boolean,
    image: string,
    hashedPassword?: boolean,
    createdAt: string,
    updatedAt: string,
    role: string
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {

    console.log(moment(product.reviews.createdDate));
    
    return (
        <div>
            <Heading title="Product Review" />
            <div className="text-sm mt-2">
                {product.reviews?.map((review: Ireview) => {
                    return (
                        <div
                            key={review.id}
                            className="max-w-300px"
                        >
                            <div className="flex gap-2 items-center">
                                <Avatar src={review?.user.image}/>
                                <div className="font-semibold ">{review?.user.name}</div>
                                <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                            </div>
                            <div className="mt-2">
                                <Rating value={review.rating} readOnly/>
                                <div className="ml-2">{review.comment}</div>
                                <hr className="mt-4 mb-4 "/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ListRating;