import { Body, Controller, Get, Post ,Param ,NotFoundException} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import {MessagesService} from './messages.service'

@Controller('messages')
export class MessagesController {
    messagesService:MessagesService

    constructor(){
        //Service is creating its own dependencie
        // NOt the way to it
        //use dependency injection
        this.messagesService=new MessagesService();
    }
    
    @Get()
    listMessages(){
        return this.messagesService.findAll();
    }

    @Post()
    //changed any from CreateMessageDto
    createMessages(@Body() body :any){
        console.log(body);
        return this.messagesService.create(body.content);
    }

    @Get('/:id')
    async getMessages(@Param('id') id:string){
        console.log(id);
        const message= await this.messagesService.findOne(id);
        if(!message){
            throw new NotFoundException('try using correct id');
        }
        return message;
    }

}

//Argument decorator 