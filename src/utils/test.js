getValue(sinisterNumber, policeNumber, brokerListe)
{
    let brokerInfo = [],
        sinisterYear = "",
        agencyCode = 0,
        category = "",
        branch = "",
        valLibCat = "",
        broker = "",
        brokerType = "";
    if (
        sinisterNumber[0] +
        sinisterNumber[1] ==
        "BJ" ||
        sinisterNumber[0] +
        sinisterNumber[1] ==
        "bj"
    ) {
        sinisterYear =
            sinisterNumber[2] +
            sinisterNumber[3] +
            sinisterNumber[4] +
            sinisterNumber[5];

    } else {
        sinisterYear =
            sinisterNumber[0] +
            sinisterNumber[1] +
            sinisterNumber[2] +
            sinisterNumber[3];
        agencyCode =
            sinisterNumber[4] +
            sinisterNumber[5] +
            sinisterNumber[6] +
            sinisterNumber[7];
        category =
            sinisterNumber[8] +
            sinisterNumber[9] +
            sinisterNumber[10];
    }
    if (
        policeNumber[0] +
        policeNumber[1] ==
        "BJ" ||
        policeNumber[0] +
        policeNumber[1] ==
        "bj"
    ) {
        agencyCode =
            policeNumber[2] +
            policeNumber[3] +
            policeNumber[4] +
            policeNumber[5];
        category =
            policeNumber[6] +
            policeNumber[7] +
            policeNumber[8];
        let rentFilterValue = [];
        rentFilterValue = this.catXperta.filter(
            (element) => element.codeCat == category
        );
        if (rentFilterValue != "") {
            valLibCat = rentFilterValue[0].libCat;
            branch = rentFilterValue[0].BRANCHE;
        }
    }
    else {
        agencyCode =
            policeNumber[0] +
            policeNumber[1] +
            policeNumber[2] +
            policeNumber[3];
        category =
            policeNumber[4] +
            policeNumber[5] +
            policeNumber[6];
        let rentFilterValue = [];
        rentFilterValue = this.catMercure.filter(
            (element) => element.codeCat == category
        );
        if (rentFilterValue != "") {
            valLibCat = rentFilterValue[0].libCat;
            branch = rentFilterValue[0].BRANCHE;
        }
    }
    if (agencyCode != 0) {
        for (let i = 0; i < brokerListe.length; i++) {
            const element = brokerListe[i];
            if (element.code) {
                if (element.code == agencyCode) {
                    brokerInfo.push(element);
                }
            }
        }
        if (brokerInfo != "") {
            broker = brokerInfo[0].name;
            brokerType = brokerInfo[0].nature;
        }
    }
    return agencyCode, category, branch, valLibCat, broker, brokerType, sinisterYear;

};
