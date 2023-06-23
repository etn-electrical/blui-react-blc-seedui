export const authConfig = {
	"organizationId": "c568a9c1-9039-4cc6-8a19-167de8c41111",
	"adopterId": "2451fe0b-fcef-4293-aaa1-8a8706ac4506",
	"adopterApplicationName": "DermsAEP",
	"inviteRegistrationUrl": "/inviteregistration",
	"selfRegistrationUrl": "/selfregistration",
	"applicationId": "adasdad0asd098d09098as",
	"roles": {
		"adopterAdmin": {
			"roleId": "3d42846d-84df-4f7b-8b92-6cb46876bbfd",
			"id": "3d42846d-84df-4f7b-8b92-6cb46876bbfd",
			"name": "Eaton Admin",
			"entityType": "admin"
		},
		"userRoles": [
			{
				"id": "a50a604f-5a66-4a82-8e9a-669917e39a84",
				"name": "OrgAdmin",
				"canRegisterUser": true,
				"entityType": "organization",
				"additionalRoleIds": [
					"64254792e4614d1b9a46d26e3e489f11",
					"64254792e4614d1b9a46d26e3e489f22"
				]
			},
			{
				"id": "56f851de-507e-4b6a-b285-43aee0079284",
				"name": "OrgViewer",
				"canRegisterUser": false,
				"entityType": "organization",
				"additionalRoleIds": [
					"64254792e4614d1b9a46d26e3e489f11",
					"64254792e4614d1b9a46d26e3e489f22"
				]
			},
			{
				"id": "be0f6979-ceeb-41ce-af19-b94ae249223c",
				"name": "LocAdmin",
				"canRegisterUser": true,
				"entityType": "location",
				"additionalRoleIds": [
					"64254792e4614d1b9a46d26e3e489f11",
					"64254792e4614d1b9a46d26e3e489f22"
				]
			},
			{
				"id": "d10482b1-655f-446c-b404-81df9fb140e4",
				"name": "LocViewer",
				"canRegisterUser": false,
				"entityType": "location",
				"additionalRoleIds": [
					"64254792e4614d1b9a46d26e3e489f11",
					"64254792e4614d1b9a46d26e3e489f22"
				]
			},
			{
				"id": "561c019c-5d12-4e6e-99f7-154443a9f39b",
				"name": "SiteAdmin",
				"canRegisterUser": true,
				"entityType": "site",
				"additionalRoleIds": [
					"64254792e4614d1b9a46d26e3e489f11",
					"64254792e4614d1b9a46d26e3e489f22"
				]
			},
			{
				"id": "4e6f5fe1-abf7-4db6-8cd5-f85e6fcf1c1a",
				"name": "SiteViewer",
				"canRegisterUser": false,
				"entityType": "site",
				"additionalRoleIds": [
					"64254792e4614d1b9a46d26e3e489f11",
					"64254792e4614d1b9a46d26e3e489f22"
				]
			}
		]
	}
}
