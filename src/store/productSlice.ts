import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants";
import axios from "axios";
import { productItemType, productType } from "@/types/types";


const axiosWithCookies = axios.create({
    withCredentials: true,
});
export const submitRating = createAsyncThunk('/product/submitRating', async (values: any) => {
    try {
        console.log("values in submit rating", values);
        const comment = values;
        const result = await axios.post("http://localhost:8080/ratings/createRating", { comment })
        console.log("result data", result.data);
        const uploadedRating = result.data;
        return uploadedRating;
    } catch (error: any) {
        console.log("error ", error.message);
    }
})
export const deleteRating = createAsyncThunk('product/deleteRating', async (itemDetails: any) => {
    try {
        const id = itemDetails.id
        const result = await axios.delete(`http://localhost:8080/ratings/deleteRating?id=${id}`)
        console.log("result", result.data);
        const deletedRatingDetail = {
            id: itemDetails.id,
            productId: itemDetails.productId,
            message: result.data.message,
        }
        return deletedRatingDetail;
    }
    catch (error: any) {
        console.log("error ", error.message);
    }
})

export const fetchProducts = createAsyncThunk(('product/fetchProducts'), async () => {
    try {
        const result = await axios.get("http://localhost:8080/products/getProducts")
        console.log("all products", result)
        const allProducts = result.data;
        return allProducts
    } catch (error: any) {
        console.log("error ", error.message);
    }
})
export const submitProduct = createAsyncThunk(('product/submitProduct'), async (productDetails: productType) => {
    try {
        const formData = new FormData();
        formData.append("name", productDetails.name)
        formData.append("category", productDetails.category)
        formData.append("color", productDetails.color)
        formData.append("description", productDetails.description)
        formData.append("image", productDetails.image)
        formData.append("price", productDetails.price.toString())
        formData.append("size", productDetails.size.toString())
        formData.append("stock", productDetails.stock.toString())
        formData.append("userId", productDetails.userId)
        console.log("form data", formData)
        const product = await axiosWithCookies.post("http://localhost:8080/products/createProduct", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log("uploaded product", product)
        const productDetail = product.data;
        console.log("product data is", productDetail);
        return productDetail
    }
    catch (e) {
        console.log("error in submitProduct", e);
    }
})
export const deleteProduct = createAsyncThunk('/product/deleteProduct', async (productId: string) => {

    console.log("productId", productId);
    const result = await axios.delete(`http://localhost:8080/products/deleteProduct?id=${productId}`)
    console.log("result", result.data);
    const deletedProductDetail = {
        productId,
        message: result.data.message,
    }
    return deletedProductDetail
})
export const updateProduct = createAsyncThunk('product/updateProduct', async (item: any) => {
    try {
        const updateProductDetails = item;
        const result = await axios.put('http://localhost:8080/products/updateProduct', updateProductDetails)
        console.log("result", result.data);
        const updatedProductDetails = {
            message: result.data.message,
            result: result.data.result
        }
        return updatedProductDetails
    } catch (error: any) {
        console.log("error in udate product", error.message);
    }
})
const productSlice = createSlice({
    name: "product",
    initialState: {
        error: null,
        product: {},
        products: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(submitProduct.fulfilled, (state, action) => {
            console.log("prodcut details in extraReducers", action.payload);
            let newState: any = {
                ...state,
                product: [...state.products, action.payload],
            }
            return newState;
        }),
            builder.addCase(fetchProducts.fulfilled, (state, action) => {
                console.log("product details", action.payload)
                let newState = {
                    ...state,
                    products: action.payload.result,
                }
                console.log("newState", newState);
                return newState;
            }),
            builder.addCase(deleteProduct.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                if (action.payload.message == "successfull") {
                    let deletedProduct = action.payload.productId
                    let products: productItemType[] = state.products;
                    let filteredProducts = products.filter((product: any) => product.id !== deletedProduct);
                    let newState: any = {
                        ...state,
                        products: filteredProducts,
                    }
                    console.log("new state in deleted product", newState);
                    return newState
                }
                return state;
            }),
            builder.addCase(submitRating.fulfilled, (state, action) => {
                console.log("action payload", action.payload);
                if (action.payload.message == "successfull") {
                    let comment = action.payload.uploadRating
                    console.log("comment", comment);
                    let products = state.products;
                    let updatedProducts = products.map((product: productItemType) => {
                        console.log('====================================');
                        console.log(comment.productId, product.id);
                        console.log('====================================');
                        if (comment.productId === product.id) {
                            return {
                                ...product,
                                ratings: [...product?.ratings, comment]
                            }
                        }
                        else {
                            return product;
                        }
                    });
                    let newState: any = {
                        ...state,
                        products: updatedProducts,
                    }
                    return newState
                }
                return state
            }),
            builder.addCase(deleteRating.fulfilled, (state, action: any) => {
                console.log("action payload", action.payload);
                if (action.payload.message == "successfull") {
                    let deletedRatingId = action.payload.id
                    let products = state.products;
                    let filteredProducts = products.map((product: productItemType) => {
                        if (product.id == action.payload.productId) {
                            return {
                                ...product,
                                ratings: product.ratings?.filter((rating: any) => rating.id !== deletedRatingId)
                            }
                        }
                        else {
                            return product
                        }

                    })
                    console.log("fiteredproducts", filteredProducts);
                    let newState: any = {
                        ...state,
                        products: filteredProducts,
                    }
                    return newState
                }
                return state
            }),
            builder.addCase(updateProduct.fulfilled, (state, action) => {
                console.log("action payload in update product", action.payload);
                if (action.payload?.message == "successfull") {
                    let updatedProduct = action.payload?.result
                    let allProducts = state.products;
                    let filteredProducts = allProducts.map((item: any) => {
                        if (item.id == updatedProduct.id) {
                            const newItem = {
                                ...item,
                                name: updatedProduct.name,
                                category: updatedProduct.category,
                                description: updatedProduct.description,
                                price: updatedProduct.price,
                                color: updatedProduct.color,
                                size: updatedProduct.size,
                                image: updatedProduct.image,
                                stock: updatedProduct.stock,
                                userId: updatedProduct.userId,
                                id: updatedProduct.id,
                            }
                            return newItem
                        }
                        else {
                            return item
                        }
                    })
                    console.log("updated filtered product");
                    let newState: any = {
                        ...state,
                        products: filteredProducts
                    }
                    console.log("new state in update product", newState);
                    return newState
                }
                else {
                    return state
                }
            })
    }

})
export default productSlice.reducer


/**
 * // import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config/Firebase";
import { EditIcon } from "@chakra-ui/icons";
import { TodoType } from "../types/TodoType";


export const submitTodo = createAsyncThunk("todos/submitTodos", async ([description, attachmentImage]: [string, Blob]) => {
    console.log("submit Todo is running");
    console.log("the value of description in submit todo", description, attachmentImage);
    try {
        const storageRef = ref(storage, `/todosImages/${description}.jpg`);
        const result = await uploadBytes(storageRef, attachmentImage)
        // const result = await storageRef.put(attachmentImage);
        console.log("result ========>", result.ref);
        const downloadURL = await getDownloadURL(result.ref)
        console.log("downloadURL", downloadURL);
        const newDoc = {
            description,
            attachmentURL: downloadURL,
            createdAt: new Date()
        }
        const docRef = await addDoc(collection(db, 'todoapp'), newDoc)
        console.log("docRef id ", docRef.id)
        const submitedDoc = {
            ...newDoc,
            id: docRef.id
        }

        console.log("submited doc", submitedDoc);
        return submitedDoc
        // setTodos([...todos, { ...newDoc, id: docRef.id }])
    }
    catch (e) {
        console.log("error in submit hadnler")
    }
})
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    console.log("get todos method");

    try {
        const querySnapshot = await getDocs(collection(db, "todoapp"));
        let todosList: TodoType[] = [];
        querySnapshot.forEach((doc) => {
            todosList.push({
                attachmentURL: doc.data()?.attachmentURL,
                description: doc.data()?.description,
                id: doc.id,
                createdAt: doc.data()?.createdAt,
            });
        });

        console.log("todos in action - slice", todosList);
        return todosList;
    } catch (error) {
        console.log("================catch====================");
        console.log(error);
        console.log("====================================");
    }
});


export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (item: TodoType) => {
    try {
        console.log("item found in thunk action", item);



        const desertRef = ref(storage, `todosImages/${item.description}.jpg`);
        await deleteObject(desertRef)
        await deleteDoc(doc(db, "todoapp", item.id));
        console.log("deleteing");
        return item
    } catch (error) {
        console.log("error", error);

    }

})

interface UpdateTodoArgs {
    itemEditInput: string;
    item: {
        id: string,
        description: string,
        attachmentURL: string,
        createdAt: object
    }
}
// export const updateTodo = createAsyncThunk("todos/updateTodos", async ({ itemEditInput, item }: UpdateTodoArgs) => {
//     try {
//         console.log("item found in thunk update action", itemEditInput, item);

//         // Get a reference to the old image file
//         const oldImageRef = ref(storage, `todosImages/${item.description}.jpg`);

//         // Delete the old image file
//         await deleteObject(oldImageRef);

//         // Construct the new file name using the new description
//         const newFileName = `${itemEditInput}.jpg`;

//         // Get a reference to the new image file
//         const newImageRef = ref(storage, `todosImages/${newFileName}`);

//         // Upload the new image file to Storage
//         await put(newImageRef, attachmentImage);

//         // Update the document in Firestore with the new description and the new file name
//         await updateDoc(doc(db, "todoapp", item.id), {
//             capital: true,
//             description: itemEditInput,
//             imageFileName: newFileName,
//             createdAt: new Date()
//         });

//         return { itemEditInput, item };

//     } catch (error) {
//         alert(`error in update todo  ${error}`);
//     }
// });

export const updateTodo = createAsyncThunk("todos/updateTodos", async ({ itemEditInput, item }: UpdateTodoArgs) => {
    try {
        console.log("item found in thunk update action", itemEditInput, item);


        // !IMPORT TO DO 
        // const desertRef = ref(storage, `todosImages/${item.description}.jpg`);
        // await deleteObject(desertRef)
        // await deleteDoc(doc(db, "todoapp", item.id))
        // let filteredTodos = todos.filter((todo) => item.id !== todo.id)
        // setTodos(filteredTodos)
        await updateDoc(doc(db, "todoapp", item.id), {
            capital: true,
            description: itemEditInput,
            createdAt: new Date()
        });
        return { itemEditInput, item }

    } catch (error) {
        alert(`error in update todo  ${error}`)
    }


})
// Define your slice
const todoSlice = createSlice({
    name: 'TodoSlice',
    initialState: { todos: [], error: null },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            console.log("state in extra builder", state)
            console.log("fetch todo in extra reducers", action.payload);
            let newState: any = {
                ...state,
                todos: action.payload,
            };
            console.log("fetched data ", newState);
            return newState;
        });



        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            console.log("add case in extra redyce", action.payload);
            const todos: TodoType[] = state.todos;
            const item = action.payload;
            if (!item) {
                return state;
            }
            let filteredTodos = todos.filter((todo) => item.id !== todo.id);
            let newState: any = {
                ...state,
                todos: filteredTodos,
            };
            return newState;
        });

        builder.addCase(submitTodo.fulfilled, (state, action) => {
            console.log("submit case in extra reducer", action.payload);
            // setTodos([...todos, { ...newDoc, id: docRef.id }])
            let newState: any = {
                ...state,
                todos: [...state.todos, action.payload]
            };
            console.log("new state is ", newState.todos);
            console.log("new state is ",newState);
            // fetchTodos()
            return newState
        });
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            console.log("item  case in extra reduce", action.payload?.itemEditInput);
            console.log("update  case in extra reduce", action.payload?.item);
            const todos: TodoType[] = state.todos;
            const item = action.payload?.item;
            let updatedTodos = todos.map((todo) => {
                console.log('====================================');
                console.log(item?.id, todo.id);
                console.log('====================================');
                if (item?.id === todo.id) {
                    return {
                        description: action.payload?.itemEditInput,
                        createdAt: new Date(),
                        id: todo.id,
                        attachmentURL: item?.attachmentURL
                    }
                }
                else {
                    return todo;
                }
            });
            console.log("updated Todos", updatedTodos);
            let newState: any = {
                ...state,
                todos: updatedTodos,
            };
            return newState;
        });
    },
});

// Export the reducer

export default todoSlice.reducer
 * 
 */