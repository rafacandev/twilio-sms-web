export class AccountInfo {
  constructor(name='', type='', status='', dateCreated=new Date(), dateUpdated=new Date()) {
    this.name = name
    this.type = type
    this.status = status
    this.dateCreated = dateCreated
    this.dateUpdated = dateUpdated
  }
}
