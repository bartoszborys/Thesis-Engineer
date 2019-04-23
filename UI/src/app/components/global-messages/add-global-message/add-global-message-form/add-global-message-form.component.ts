import { Component, OnInit } from '@angular/core';
import { GlobalMessagesService } from 'src/app/services/global-messages/global-messages.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GlobalMessage } from 'src/app/models/backend-integration-models/GlobalMessage';
import { JwtPropertiesService } from 'src/app/services/jwt-properties/jwt-properties.service';

@Component({
  selector: 'app-add-global-message-form',
  templateUrl: './add-global-message-form.component.html',
  styleUrls: ['./add-global-message-form.component.css']
})
export class AddGlobalMessageFormComponent implements OnInit {
  editedDetails: GlobalMessage;
  editMode: boolean = false;
  form: FormGroup = new FormGroup({
    typeId: new FormControl(),
    header: new FormControl(),
    message: new FormControl()
  });
  messagesTypes: any;

  constructor(private service: GlobalMessagesService, private jwtToken: JwtPropertiesService) { }
  
  ngOnInit() {
    this.service.editMessage.subscribe(
      editMessageData => this.rewriteData(editMessageData)
    )
    this.setGlobalMessagesTypes();
  }
  
  cleanUp(): void{
    this.rewriteData({});
    this.editedDetails = null;
  }

  setGlobalMessagesTypes(): void{
    this.service.getGlobalMessagesTypes().subscribe(
      response => this.messagesTypes = response
    )
  }

  rewriteData(editMessageData: GlobalMessage): void{
    this.editMode = true;
    this.editedDetails = editMessageData;
    
    this.form.get('typeId').setValue(editMessageData.typeId);
    this.form.get('header').setValue(editMessageData.header);
    this.form.get('message').setValue(editMessageData.message);
  }

  edit(){
    const formValue = this.form.value;
    this.editedDetails.header = formValue.header;
    this.editedDetails.message = formValue.message;
    this.editedDetails.typeId = formValue.typeId;
    this.service.patch(this.editedDetails).subscribe(
      patcher => console.log(patcher),
      error => alert(JSON.stringify(error))
    );
  }

  send(){
    const formValue = this.form.value;
    const newMessage: GlobalMessage = {
      header: formValue.header,
      message: formValue.message,
      typeId: formValue.typeId,
      senderId: this.jwtToken.getCurrentUserId()
    }
    this.service.put(newMessage).subscribe(
      x=> console.log(x),
      x=> alert(JSON.stringify(x))
    );
  }

  ngOnDestroy(){
  }
}
