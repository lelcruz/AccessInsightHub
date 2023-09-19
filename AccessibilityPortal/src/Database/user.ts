import { DocumentSnapshot } from "firebase/firestore";

class User {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    password: string;
    role: string;

    constructor(firstName: string, lastName: string, dob: string, email: string, password: string, role: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.email = email;
        this.password = password; // will be encrypted while signing up
        this.role = role;
    }

    toString(): string {
        return this.firstName + ', ' + this.lastName + ', ' + this.email;
    }
}

// Firestore data converter
const UserConverter = {
    toFirestore: (User: User) => {
        return {
            firstName: User.firstName,
            lastName: User.lastName,
            dob: User.dob,
            email: User.email,
            password: User.password,
            role: User.role,
        };
    },
    fromFirestore: (snapshot: DocumentSnapshot) => {
        const data = snapshot.data();
        if (data) {
            return new User(data.firstName, data.lastName, data.dob, data.email, data.password, data.role);
        } else {
            // Handle the case where data is undefined (e.g., document does not exist)
            // You might want to return a default User object or throw an error, depending on your use case
            throw new Error("Document does not exist");
        }
    }
};

export { User, UserConverter };
