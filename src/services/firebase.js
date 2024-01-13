import { firebase } from '../lib/firebase'

export async function doesUsernameExist(username) {
    const result = await firebase.firestore().collection('users').where('userName', '==', username).get()

    return result.docs.map((user) => user.data().length > 0)
}

export async function getUserByUserId(userId) {
    const result = await firebase.firestore().collection('users').where('userId', '==', userId).get()

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))

    return user
}

export async function getUsersByUserId(userId) {
    const result = await firebase.firestore().collection('users').where('userId', '!=', userId).limit(10).get()

    return result.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    }))
}

export async function getMessagesByRoomId(roomId) {
    const result = await firebase.firestore().collection('messages').where('roomId', '==', roomId).get()

    return result.docs.map((message) => ({
        ...message.data(),
        docId: message.id
    }))
}

export async function doesRoomExist(roomId) {
    const result = await firebase.firestore().collection('rooms').where('roomId', '==', roomId).get()

    return result.docs.map((room) => room.data().length > 0)
}

export async function doesGroupExist(groupId) {
    const result = await firebase.firestore().collection('rooms').where('groupId', '==', groupId).get()

    return result.docs.map((room) => room.data().length > 0)
}
