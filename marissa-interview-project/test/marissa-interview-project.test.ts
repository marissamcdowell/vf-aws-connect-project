import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as MarissaInterviewProject from '../lib/marissa-interview-project-stack';

test('Stack exists as expected', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new MarissaInterviewProject.MarissaInterviewProjectStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {
        "VanityNumbers9448E191": {
          "Type": "AWS::DynamoDB::Table",
          "Properties": {
            "KeySchema": [
              {
                "AttributeName": "PHONE_NUMBER",
                "KeyType": "HASH"
              },
              {
                "AttributeName": "TIMESTAMP",
                "KeyType": "RANGE"
              }
            ],
            "AttributeDefinitions": [
              {
                "AttributeName": "PHONE_NUMBER",
                "AttributeType": "S"
              },
              {
                "AttributeName": "TIMESTAMP",
                "AttributeType": "N"
              },
              {
                "AttributeName": "STATUS",
                "AttributeType": "S"
              }
            ],
            "GlobalSecondaryIndexes": [
              {
                "IndexName": "timestampGSI",
                "KeySchema": [
                  {
                    "AttributeName": "STATUS",
                    "KeyType": "HASH"
                  },
                  {
                    "AttributeName": "TIMESTAMP",
                    "KeyType": "RANGE"
                  }
                ],
                "Projection": {
                  "ProjectionType": "ALL"
                },
                "ProvisionedThroughput": {
                  "ReadCapacityUnits": 5,
                  "WriteCapacityUnits": 5
                }
              }
            ],
            "ProvisionedThroughput": {
              "ReadCapacityUnits": 5,
              "WriteCapacityUnits": 5
            }
          },
          "UpdateReplacePolicy": "Delete",
          "DeletionPolicy": "Delete"
        },
        "VanitiesHandlerServiceRole46BCF9E5": {
          "Type": "AWS::IAM::Role",
          "Properties": {
            "AssumeRolePolicyDocument": {
              "Statement": [
                {
                  "Action": "sts:AssumeRole",
                  "Effect": "Allow",
                  "Principal": {
                    "Service": "lambda.amazonaws.com"
                  }
                }
              ],
              "Version": "2012-10-17"
            },
            "ManagedPolicyArns": [
              {
                "Fn::Join": [
                  "",
                  [
                    "arn:",
                    {
                      "Ref": "AWS::Partition"
                    },
                    ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
                  ]
                ]
              }
            ]
          }
        },
        "VanitiesHandlerServiceRoleDefaultPolicyCADD368C": {
          "Type": "AWS::IAM::Policy",
          "Properties": {
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "dynamodb:BatchWriteItem",
                    "dynamodb:PutItem",
                    "dynamodb:UpdateItem",
                    "dynamodb:DeleteItem"
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    {
                      "Fn::GetAtt": [
                        "VanityNumbers9448E191",
                        "Arn"
                      ]
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          {
                            "Fn::GetAtt": [
                              "VanityNumbers9448E191",
                              "Arn"
                            ]
                          },
                          "/index/*"
                        ]
                      ]
                    }
                  ]
                }
              ],
              "Version": "2012-10-17"
            },
            "PolicyName": "VanitiesHandlerServiceRoleDefaultPolicyCADD368C",
            "Roles": [
              {
                "Ref": "VanitiesHandlerServiceRole46BCF9E5"
              }
            ]
          }
        },
        "VanitiesHandlerADAFC9C2": {
          "Type": "AWS::Lambda::Function",
          "Properties": {
            "Code": {
              "S3Bucket": {
                "Ref": "AssetParameters75997a9e96fa72c2fc4b2ff073a233f5109803b8b9459a1dc3ade0cb15906342S3Bucket0D35B50D"
              },
              "S3Key": {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::Select": [
                        0,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameters75997a9e96fa72c2fc4b2ff073a233f5109803b8b9459a1dc3ade0cb15906342S3VersionKeyC8D51962"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "Fn::Select": [
                        1,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameters75997a9e96fa72c2fc4b2ff073a233f5109803b8b9459a1dc3ade0cb15906342S3VersionKeyC8D51962"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                ]
              }
            },
            "Role": {
              "Fn::GetAtt": [
                "VanitiesHandlerServiceRole46BCF9E5",
                "Arn"
              ]
            },
            "Environment": {
              "Variables": {
                "VANITY_NUMBERS_TABLE": {
                  "Ref": "VanityNumbers9448E191"
                }
              }
            },
            "Handler": "vanities.handler",
            "Runtime": "nodejs12.x"
          },
          "DependsOn": [
            "VanitiesHandlerServiceRoleDefaultPolicyCADD368C",
            "VanitiesHandlerServiceRole46BCF9E5"
          ]
        },
        "LastFiveHandlerServiceRole8D838C15": {
          "Type": "AWS::IAM::Role",
          "Properties": {
            "AssumeRolePolicyDocument": {
              "Statement": [
                {
                  "Action": "sts:AssumeRole",
                  "Effect": "Allow",
                  "Principal": {
                    "Service": "lambda.amazonaws.com"
                  }
                }
              ],
              "Version": "2012-10-17"
            },
            "ManagedPolicyArns": [
              {
                "Fn::Join": [
                  "",
                  [
                    "arn:",
                    {
                      "Ref": "AWS::Partition"
                    },
                    ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
                  ]
                ]
              }
            ]
          }
        },
        "LastFiveHandlerServiceRoleDefaultPolicy187ACC3B": {
          "Type": "AWS::IAM::Policy",
          "Properties": {
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "dynamodb:BatchGetItem",
                    "dynamodb:GetRecords",
                    "dynamodb:GetShardIterator",
                    "dynamodb:Query",
                    "dynamodb:GetItem",
                    "dynamodb:Scan",
                    "dynamodb:ConditionCheckItem"
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    {
                      "Fn::GetAtt": [
                        "VanityNumbers9448E191",
                        "Arn"
                      ]
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          {
                            "Fn::GetAtt": [
                              "VanityNumbers9448E191",
                              "Arn"
                            ]
                          },
                          "/index/*"
                        ]
                      ]
                    }
                  ]
                }
              ],
              "Version": "2012-10-17"
            },
            "PolicyName": "LastFiveHandlerServiceRoleDefaultPolicy187ACC3B",
            "Roles": [
              {
                "Ref": "LastFiveHandlerServiceRole8D838C15"
              }
            ]
          }
        },
        "LastFiveHandler732DFC20": {
          "Type": "AWS::Lambda::Function",
          "Properties": {
            "Code": {
              "S3Bucket": {
                "Ref": "AssetParameters75997a9e96fa72c2fc4b2ff073a233f5109803b8b9459a1dc3ade0cb15906342S3Bucket0D35B50D"
              },
              "S3Key": {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::Select": [
                        0,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameters75997a9e96fa72c2fc4b2ff073a233f5109803b8b9459a1dc3ade0cb15906342S3VersionKeyC8D51962"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "Fn::Select": [
                        1,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameters75997a9e96fa72c2fc4b2ff073a233f5109803b8b9459a1dc3ade0cb15906342S3VersionKeyC8D51962"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                ]
              }
            },
            "Role": {
              "Fn::GetAtt": [
                "LastFiveHandlerServiceRole8D838C15",
                "Arn"
              ]
            },
            "Environment": {
              "Variables": {
                "VANITY_NUMBERS_TABLE": {
                  "Ref": "VanityNumbers9448E191"
                }
              }
            },
            "Handler": "last5calls.handler",
            "Runtime": "nodejs12.x"
          },
          "DependsOn": [
            "LastFiveHandlerServiceRoleDefaultPolicy187ACC3B",
            "LastFiveHandlerServiceRole8D838C15"
          ]
        },
        "Last5CallsEndpoint423E5997": {
          "Type": "AWS::ApiGateway::RestApi",
          "Properties": {
            "Name": "Last5CallsEndpoint"
          }
        },
        "Last5CallsEndpointCloudWatchRoleD2243925": {
          "Type": "AWS::IAM::Role",
          "Properties": {
            "AssumeRolePolicyDocument": {
              "Statement": [
                {
                  "Action": "sts:AssumeRole",
                  "Effect": "Allow",
                  "Principal": {
                    "Service": "apigateway.amazonaws.com"
                  }
                }
              ],
              "Version": "2012-10-17"
            },
            "ManagedPolicyArns": [
              {
                "Fn::Join": [
                  "",
                  [
                    "arn:",
                    {
                      "Ref": "AWS::Partition"
                    },
                    ":iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
                  ]
                ]
              }
            ]
          }
        },
        "Last5CallsEndpointAccountEF6EF419": {
          "Type": "AWS::ApiGateway::Account",
          "Properties": {
            "CloudWatchRoleArn": {
              "Fn::GetAtt": [
                "Last5CallsEndpointCloudWatchRoleD2243925",
                "Arn"
              ]
            }
          },
          "DependsOn": [
            "Last5CallsEndpoint423E5997"
          ]
        },
        "Last5CallsEndpointDeploymentAA7818EC640e9e5bca5c4f8ce68c73f395ae133d": {
          "Type": "AWS::ApiGateway::Deployment",
          "Properties": {
            "RestApiId": {
              "Ref": "Last5CallsEndpoint423E5997"
            },
            "Description": "Automatically created by the RestApi construct"
          },
          "DependsOn": [
            "Last5CallsEndpointproxyANYF509B819",
            "Last5CallsEndpointproxy9049E1E0",
            "Last5CallsEndpointANY87A11631"
          ]
        },
        "Last5CallsEndpointDeploymentStageprod77C2FCCC": {
          "Type": "AWS::ApiGateway::Stage",
          "Properties": {
            "RestApiId": {
              "Ref": "Last5CallsEndpoint423E5997"
            },
            "DeploymentId": {
              "Ref": "Last5CallsEndpointDeploymentAA7818EC640e9e5bca5c4f8ce68c73f395ae133d"
            },
            "StageName": "prod"
          }
        },
        "Last5CallsEndpointproxy9049E1E0": {
          "Type": "AWS::ApiGateway::Resource",
          "Properties": {
            "ParentId": {
              "Fn::GetAtt": [
                "Last5CallsEndpoint423E5997",
                "RootResourceId"
              ]
            },
            "PathPart": "{proxy+}",
            "RestApiId": {
              "Ref": "Last5CallsEndpoint423E5997"
            }
          }
        },
        "Last5CallsEndpointproxyANYApiPermissionMyTestStackLast5CallsEndpoint016242A9ANYproxyE68649DD": {
          "Type": "AWS::Lambda::Permission",
          "Properties": {
            "Action": "lambda:InvokeFunction",
            "FunctionName": {
              "Fn::GetAtt": [
                "LastFiveHandler732DFC20",
                "Arn"
              ]
            },
            "Principal": "apigateway.amazonaws.com",
            "SourceArn": {
              "Fn::Join": [
                "",
                [
                  "arn:",
                  {
                    "Ref": "AWS::Partition"
                  },
                  ":execute-api:",
                  {
                    "Ref": "AWS::Region"
                  },
                  ":",
                  {
                    "Ref": "AWS::AccountId"
                  },
                  ":",
                  {
                    "Ref": "Last5CallsEndpoint423E5997"
                  },
                  "/",
                  {
                    "Ref": "Last5CallsEndpointDeploymentStageprod77C2FCCC"
                  },
                  "/*/*"
                ]
              ]
            }
          }
        },
        "Last5CallsEndpointproxyANYApiPermissionTestMyTestStackLast5CallsEndpoint016242A9ANYproxy25AE3B24": {
          "Type": "AWS::Lambda::Permission",
          "Properties": {
            "Action": "lambda:InvokeFunction",
            "FunctionName": {
              "Fn::GetAtt": [
                "LastFiveHandler732DFC20",
                "Arn"
              ]
            },
            "Principal": "apigateway.amazonaws.com",
            "SourceArn": {
              "Fn::Join": [
                "",
                [
                  "arn:",
                  {
                    "Ref": "AWS::Partition"
                  },
                  ":execute-api:",
                  {
                    "Ref": "AWS::Region"
                  },
                  ":",
                  {
                    "Ref": "AWS::AccountId"
                  },
                  ":",
                  {
                    "Ref": "Last5CallsEndpoint423E5997"
                  },
                  "/test-invoke-stage/*/*"
                ]
              ]
            }
          }
        },
        "Last5CallsEndpointproxyANYF509B819": {
          "Type": "AWS::ApiGateway::Method",
          "Properties": {
            "HttpMethod": "ANY",
            "ResourceId": {
              "Ref": "Last5CallsEndpointproxy9049E1E0"
            },
            "RestApiId": {
              "Ref": "Last5CallsEndpoint423E5997"
            },
            "AuthorizationType": "NONE",
            "Integration": {
              "IntegrationHttpMethod": "POST",
              "Type": "AWS_PROXY",
              "Uri": {
                "Fn::Join": [
                  "",
                  [
                    "arn:",
                    {
                      "Ref": "AWS::Partition"
                    },
                    ":apigateway:",
                    {
                      "Ref": "AWS::Region"
                    },
                    ":lambda:path/2015-03-31/functions/",
                    {
                      "Fn::GetAtt": [
                        "LastFiveHandler732DFC20",
                        "Arn"
                      ]
                    },
                    "/invocations"
                  ]
                ]
              }
            }
          }
        },
        "Last5CallsEndpointANYApiPermissionMyTestStackLast5CallsEndpoint016242A9ANYF4824068": {
          "Type": "AWS::Lambda::Permission",
          "Properties": {
            "Action": "lambda:InvokeFunction",
            "FunctionName": {
              "Fn::GetAtt": [
                "LastFiveHandler732DFC20",
                "Arn"
              ]
            },
            "Principal": "apigateway.amazonaws.com",
            "SourceArn": {
              "Fn::Join": [
                "",
                [
                  "arn:",
                  {
                    "Ref": "AWS::Partition"
                  },
                  ":execute-api:",
                  {
                    "Ref": "AWS::Region"
                  },
                  ":",
                  {
                    "Ref": "AWS::AccountId"
                  },
                  ":",
                  {
                    "Ref": "Last5CallsEndpoint423E5997"
                  },
                  "/",
                  {
                    "Ref": "Last5CallsEndpointDeploymentStageprod77C2FCCC"
                  },
                  "/*/"
                ]
              ]
            }
          }
        },
        "Last5CallsEndpointANYApiPermissionTestMyTestStackLast5CallsEndpoint016242A9ANY5CEAEF06": {
          "Type": "AWS::Lambda::Permission",
          "Properties": {
            "Action": "lambda:InvokeFunction",
            "FunctionName": {
              "Fn::GetAtt": [
                "LastFiveHandler732DFC20",
                "Arn"
              ]
            },
            "Principal": "apigateway.amazonaws.com",
            "SourceArn": {
              "Fn::Join": [
                "",
                [
                  "arn:",
                  {
                    "Ref": "AWS::Partition"
                  },
                  ":execute-api:",
                  {
                    "Ref": "AWS::Region"
                  },
                  ":",
                  {
                    "Ref": "AWS::AccountId"
                  },
                  ":",
                  {
                    "Ref": "Last5CallsEndpoint423E5997"
                  },
                  "/test-invoke-stage/*/"
                ]
              ]
            }
          }
        },
        "Last5CallsEndpointANY87A11631": {
          "Type": "AWS::ApiGateway::Method",
          "Properties": {
            "HttpMethod": "ANY",
            "ResourceId": {
              "Fn::GetAtt": [
                "Last5CallsEndpoint423E5997",
                "RootResourceId"
              ]
            },
            "RestApiId": {
              "Ref": "Last5CallsEndpoint423E5997"
            },
            "AuthorizationType": "NONE",
            "Integration": {
              "IntegrationHttpMethod": "POST",
              "Type": "AWS_PROXY",
              "Uri": {
                "Fn::Join": [
                  "",
                  [
                    "arn:",
                    {
                      "Ref": "AWS::Partition"
                    },
                    ":apigateway:",
                    {
                      "Ref": "AWS::Region"
                    },
                    ":lambda:path/2015-03-31/functions/",
                    {
                      "Fn::GetAtt": [
                        "LastFiveHandler732DFC20",
                        "Arn"
                      ]
                    },
                    "/invocations"
                  ]
                ]
              }
            }
          }
        },
        "Last5CallsAppBucket0D9783D8": {
          "Type": "AWS::S3::Bucket",
          "Properties": {
            "WebsiteConfiguration": {
              "IndexDocument": "index.html"
            }
          },
          "UpdateReplacePolicy": "Delete",
          "DeletionPolicy": "Delete"
        },
        "Last5CallsAppBucketPolicyA361D4C8": {
          "Type": "AWS::S3::BucketPolicy",
          "Properties": {
            "Bucket": {
              "Ref": "Last5CallsAppBucket0D9783D8"
            },
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": "s3:GetObject",
                  "Effect": "Allow",
                  "Principal": "*",
                  "Resource": {
                    "Fn::Join": [
                      "",
                      [
                        {
                          "Fn::GetAtt": [
                            "Last5CallsAppBucket0D9783D8",
                            "Arn"
                          ]
                        },
                        "/*"
                      ]
                    ]
                  }
                }
              ],
              "Version": "2012-10-17"
            }
          }
        },
        "deployStaticWebsiteAwsCliLayer74CBF04E": {
          "Type": "AWS::Lambda::LayerVersion",
          "Properties": {
            "Content": {
              "S3Bucket": {
                "Ref": "AssetParameterse9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68S3BucketAEADE8C7"
              },
              "S3Key": {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::Select": [
                        0,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameterse9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68S3VersionKeyE415415F"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "Fn::Select": [
                        1,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameterse9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68S3VersionKeyE415415F"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                ]
              }
            },
            "Description": "/opt/awscli/aws"
          }
        },
        "deployStaticWebsiteCustomResource73B4205E": {
          "Type": "Custom::CDKBucketDeployment",
          "Properties": {
            "ServiceToken": {
              "Fn::GetAtt": [
                "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C81C01536",
                "Arn"
              ]
            },
            "SourceBucketNames": [
              {
                "Ref": "AssetParameters57e4ea59c8e7271e48d5e3ccbff4af1e2a9be8751932c342231019ed82bb0d30S3Bucket9E2CBC0B"
              }
            ],
            "SourceObjectKeys": [
              {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::Select": [
                        0,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameters57e4ea59c8e7271e48d5e3ccbff4af1e2a9be8751932c342231019ed82bb0d30S3VersionKey95A7C1ED"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "Fn::Select": [
                        1,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameters57e4ea59c8e7271e48d5e3ccbff4af1e2a9be8751932c342231019ed82bb0d30S3VersionKey95A7C1ED"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                ]
              }
            ],
            "DestinationBucketName": {
              "Ref": "Last5CallsAppBucket0D9783D8"
            },
            "Prune": true
          },
          "UpdateReplacePolicy": "Delete",
          "DeletionPolicy": "Delete"
        },
        "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265": {
          "Type": "AWS::IAM::Role",
          "Properties": {
            "AssumeRolePolicyDocument": {
              "Statement": [
                {
                  "Action": "sts:AssumeRole",
                  "Effect": "Allow",
                  "Principal": {
                    "Service": "lambda.amazonaws.com"
                  }
                }
              ],
              "Version": "2012-10-17"
            },
            "ManagedPolicyArns": [
              {
                "Fn::Join": [
                  "",
                  [
                    "arn:",
                    {
                      "Ref": "AWS::Partition"
                    },
                    ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
                  ]
                ]
              }
            ]
          }
        },
        "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF": {
          "Type": "AWS::IAM::Policy",
          "Properties": {
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "s3:GetObject*",
                    "s3:GetBucket*",
                    "s3:List*"
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:",
                          {
                            "Ref": "AWS::Partition"
                          },
                          ":s3:::",
                          {
                            "Ref": "AssetParameters57e4ea59c8e7271e48d5e3ccbff4af1e2a9be8751932c342231019ed82bb0d30S3Bucket9E2CBC0B"
                          }
                        ]
                      ]
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:",
                          {
                            "Ref": "AWS::Partition"
                          },
                          ":s3:::",
                          {
                            "Ref": "AssetParameters57e4ea59c8e7271e48d5e3ccbff4af1e2a9be8751932c342231019ed82bb0d30S3Bucket9E2CBC0B"
                          },
                          "/*"
                        ]
                      ]
                    }
                  ]
                },
                {
                  "Action": [
                    "s3:GetObject*",
                    "s3:GetBucket*",
                    "s3:List*",
                    "s3:DeleteObject*",
                    "s3:PutObject*",
                    "s3:Abort*"
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    {
                      "Fn::GetAtt": [
                        "Last5CallsAppBucket0D9783D8",
                        "Arn"
                      ]
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          {
                            "Fn::GetAtt": [
                              "Last5CallsAppBucket0D9783D8",
                              "Arn"
                            ]
                          },
                          "/*"
                        ]
                      ]
                    }
                  ]
                }
              ],
              "Version": "2012-10-17"
            },
            "PolicyName": "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF",
            "Roles": [
              {
                "Ref": "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265"
              }
            ]
          }
        },
        "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C81C01536": {
          "Type": "AWS::Lambda::Function",
          "Properties": {
            "Code": {
              "S3Bucket": {
                "Ref": "AssetParametersc24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cfS3Bucket55EFA30C"
              },
              "S3Key": {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::Select": [
                        0,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParametersc24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cfS3VersionKey60329B70"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "Fn::Select": [
                        1,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParametersc24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cfS3VersionKey60329B70"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                ]
              }
            },
            "Role": {
              "Fn::GetAtt": [
                "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265",
                "Arn"
              ]
            },
            "Handler": "index.handler",
            "Layers": [
              {
                "Ref": "deployStaticWebsiteAwsCliLayer74CBF04E"
              }
            ],
            "Runtime": "python3.6",
            "Timeout": 900
          },
          "DependsOn": [
            "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF",
            "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265"
          ]
        }
      },
      "Parameters": {
        "AssetParameters75997a9e96fa72c2fc4b2ff073a233f5109803b8b9459a1dc3ade0cb15906342S3Bucket0D35B50D": {
          "Type": "String",
          "Description": "S3 bucket for asset \"75997a9e96fa72c2fc4b2ff073a233f5109803b8b9459a1dc3ade0cb15906342\""
        },
        "AssetParameters75997a9e96fa72c2fc4b2ff073a233f5109803b8b9459a1dc3ade0cb15906342S3VersionKeyC8D51962": {
          "Type": "String",
          "Description": "S3 key for asset version \"75997a9e96fa72c2fc4b2ff073a233f5109803b8b9459a1dc3ade0cb15906342\""
        },
        "AssetParameters75997a9e96fa72c2fc4b2ff073a233f5109803b8b9459a1dc3ade0cb15906342ArtifactHash854D0B0B": {
          "Type": "String",
          "Description": "Artifact hash for asset \"75997a9e96fa72c2fc4b2ff073a233f5109803b8b9459a1dc3ade0cb15906342\""
        },
        "AssetParameterse9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68S3BucketAEADE8C7": {
          "Type": "String",
          "Description": "S3 bucket for asset \"e9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68\""
        },
        "AssetParameterse9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68S3VersionKeyE415415F": {
          "Type": "String",
          "Description": "S3 key for asset version \"e9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68\""
        },
        "AssetParameterse9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68ArtifactHashD9A515C3": {
          "Type": "String",
          "Description": "Artifact hash for asset \"e9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68\""
        },
        "AssetParametersc24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cfS3Bucket55EFA30C": {
          "Type": "String",
          "Description": "S3 bucket for asset \"c24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cf\""
        },
        "AssetParametersc24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cfS3VersionKey60329B70": {
          "Type": "String",
          "Description": "S3 key for asset version \"c24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cf\""
        },
        "AssetParametersc24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cfArtifactHash85F58E48": {
          "Type": "String",
          "Description": "Artifact hash for asset \"c24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cf\""
        },
        "AssetParameters57e4ea59c8e7271e48d5e3ccbff4af1e2a9be8751932c342231019ed82bb0d30S3Bucket9E2CBC0B": {
          "Type": "String",
          "Description": "S3 bucket for asset \"57e4ea59c8e7271e48d5e3ccbff4af1e2a9be8751932c342231019ed82bb0d30\""
        },
        "AssetParameters57e4ea59c8e7271e48d5e3ccbff4af1e2a9be8751932c342231019ed82bb0d30S3VersionKey95A7C1ED": {
          "Type": "String",
          "Description": "S3 key for asset version \"57e4ea59c8e7271e48d5e3ccbff4af1e2a9be8751932c342231019ed82bb0d30\""
        },
        "AssetParameters57e4ea59c8e7271e48d5e3ccbff4af1e2a9be8751932c342231019ed82bb0d30ArtifactHash4913416C": {
          "Type": "String",
          "Description": "Artifact hash for asset \"57e4ea59c8e7271e48d5e3ccbff4af1e2a9be8751932c342231019ed82bb0d30\""
        }
      },
      "Outputs": {
        "Last5CallsEndpointE11F0256": {
          "Value": {
            "Fn::Join": [
              "",
              [
                "https://",
                {
                  "Ref": "Last5CallsEndpoint423E5997"
                },
                ".execute-api.",
                {
                  "Ref": "AWS::Region"
                },
                ".",
                {
                  "Ref": "AWS::URLSuffix"
                },
                "/",
                {
                  "Ref": "Last5CallsEndpointDeploymentStageprod77C2FCCC"
                },
                "/"
              ]
            ]
          }
        }
      }
    }, MatchStyle.EXACT))
});
