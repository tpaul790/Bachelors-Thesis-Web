import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Result } from "antd";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {UserRole} from "../user/dto/UserDtos.ts";
import {getIdFromToken, getRoleFromToken, hasToken, isExpired} from "../utils/functions/token.ts";
import {setLoggedUser} from "../api/userSlice.ts";
import {useLazyGetUserByIdQuery} from "../user/api/userQueryApi.ts";

interface IOwnProps {
    userRoles: UserRole[];
    child: React.ReactNode;
}

const ProtectedRoute = ({ userRoles, child }: IOwnProps) => {
    const [getUserById, { data: loggedInUser }] = useLazyGetUserByIdQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(20);
    const userId = getIdFromToken();

    const hasAccess = () => {
        const role = getRoleFromToken();
        return userRoles.includes(UserRole[role as keyof typeof UserRole]);
    };

    const tokenExists = hasToken();
    const tokenExpired = tokenExists ? isExpired() : false;
    const userHasAccess = tokenExists && !tokenExpired ? hasAccess() : false;
    const showAccessDenied = tokenExists && !tokenExpired && !userHasAccess;

    useEffect(() => {
        if (userId) {
            getUserById(userId);
        }
    }, [userId, getUserById]);

    useEffect(() => {
        if (loggedInUser) {
            dispatch(setLoggedUser(loggedInUser));
        }
    }, [dispatch, loggedInUser]);


    useEffect(() => {
        if (!showAccessDenied) {
            return;
        }

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [showAccessDenied, navigate]);

    if (!tokenExists) {
        return <Navigate to="/" />;
    }

    if (tokenExpired) {
        localStorage.clear();
        return <Navigate to="/" />;
    }

    if (userHasAccess) {
        return (
            <>
                {child}
            </>
        );
    }

    return (
        <div className="flex-container">
            <Result
                status="403"
                title={<span style={{ color: "white" }}>Access Restricted</span>}
                subTitle={
                    <span style={{ color: "white" }}>
                        You don't have the required permissions to view this page. Redirecting in {countdown} seconds...
                    </span>
                }
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>
                        Go Home
                    </Button>
                }
            />
        </div>
    );
};

export default ProtectedRoute;
