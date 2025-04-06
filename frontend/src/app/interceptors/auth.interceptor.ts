import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export const AuthTokenInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const token = localStorage.getItem('token');

    if (token) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return next(cloned);
    }
    return next(req);
};
