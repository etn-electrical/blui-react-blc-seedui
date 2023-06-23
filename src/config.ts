export const rolesConfig = {
	"inviteRegistrationUrl": "/inviteregistration",
	"selfRegistrationUrl": "/selfregistration",
	"roles": {
		"adopterAdmin": {
			"id": "3d42846d-84df-4f7b-8b92-6cb46876bbfd",
			"name": "Eaton Admin",
			"entityType": "admin",
			"order": 1
		},
		"userRoles": [
			{
				"id": "a50a604f-5a66-4a82-8e9a-669917e39a84",
				"name": "Organization Admin",
				"canRegisterUser": true,
				"entityType": "organization",
				"order": 2,
				"additionalRoleIds": [
					"64254792e4614d1b9a46d26e3e489f11",
					"64254792e4614d1b9a46d26e3e489f22"
				]
			},
			{
				"id": "56f851de-507e-4b6a-b285-43aee0079284",
				"name": "Organization Viewer",
				"canRegisterUser": false,
				"entityType": "organization",
				"order": 5,
				"additionalRoleIds": [
					"64254792e4614d1b9a46d26e3e489f11",
					"64254792e4614d1b9a46d26e3e489f22"
				]
			},
			{
				"id": "be0f6979-ceeb-41ce-af19-b94ae249223c",
				"name": "Location Admin",
				"canRegisterUser": true,
				"entityType": "location",
				"order": 3,
				"additionalRoleIds": [
					"64254792e4614d1b9a46d26e3e489f11",
					"64254792e4614d1b9a46d26e3e489f22"
				]
			},
			{
				"id": "d10482b1-655f-446c-b404-81df9fb140e4",
				"name": "Location Viewer",
				"canRegisterUser": false,
				"entityType": "location",
				"order": 6,
				"additionalRoleIds": [
					"64254792e4614d1b9a46d26e3e489f11",
					"64254792e4614d1b9a46d26e3e489f22"
				]
			},
			{
				"id": "561c019c-5d12-4e6e-99f7-154443a9f39b",
				"name": "Site Admin",
				"canRegisterUser": true,
				"entityType": "site",
				"order": 4,
				"additionalRoleIds": [
					"64254792e4614d1b9a46d26e3e489f11",
					"64254792e4614d1b9a46d26e3e489f22"
				]
			},
			{
				"id": "4e6f5fe1-abf7-4db6-8cd5-f85e6fcf1c1a",
				"name": "Site Viewer",
				"canRegisterUser": false,
				"entityType": "site",
				"order": 7,
				"additionalRoleIds": [
					"64254792e4614d1b9a46d26e3e489f11",
					"64254792e4614d1b9a46d26e3e489f22"
				]
			}
		]
	}
}
