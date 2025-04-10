import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}

    canActivate(context:ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // const roles = this.reflector.get<string[]>('roles', context.getHandler());
        
        // if(!roles) { return true }
        // const request = context.switchToHttp().getRequest();
        // console.log(request);
        // const user = request.user;
        
        // return matchRoles(roles, user.role)
        return true;
}
}
function matchRoles(requestRoles:string[], userRole:string):boolean {
    return requestRoles.includes(userRole);
}