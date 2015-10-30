A.app({
  appName: "CusDev CRM",
  appIcon: "phone",
  onlyAuthenticated: true,
  menuItems: [
    {
      name: "Contact",
      entityTypeId: "Contact",
      icon: "user"
    }, {
      name: "Board",
      entityTypeId: "FlowBoard",
      icon: "bars"
    }, {
      name: "Statuses",
      entityTypeId: "Status",
      icon: "sort"
    }
  ],
  entities: function(Fields) {
    return {
      Contact: {
        fields: {
          name: Fields.text("Name").required(),
          company: Fields.text("Company").required(),
          site: Fields.text("Site"),
          email: Fields.text("Email"),
          skype: Fields.text("Skype"),
          phone: Fields.text("Phone"),
          lastContactDate: Fields.date('Last contact date'),
          status: Fields.fixedReference("Status", "Status")
        },
        views: {
          FlowBoard: {
            customView: "board"
          }
        }
      },
      Status: {
        fields: {
          name: Fields.text("Name").required(),
          order: Fields.integer("Order").required()
        },
        sorting: [['order', 1]],
        referenceName: "name"
      }
    }
  },
  migrations: function (Migrations) { return [
    {
      name: "statuses",
      operation: Migrations.insert("Status", [
        {id: "1", name: "Message Sent", order: 1},
        {id: "2", name: "Answered", order: 2},
        {id: "3", name: "Meeting Approved", order: 3},
        {id: "4", name: "Meeting Finished", order: 4},
        {id: "5", name: "Rejected", order: 5}
      ])
    },
    {
      name: "demo-contacts",
      operation: Migrations.insert("Contact", [
        {id: "1", name: "John Doe", company: "Acme, Inc.", email: "john@acme.com", site: "acme.com", status: {id: "1"}, lastContactDate: "2015-07-18"},
        {id: "2", name: "Peter Stone", company: "FooBar LLC", email: "peter@foobar.com", status: {id: "2"}, lastContactDate: "2015-07-17"}
      ])
    }
  ]}
});