//
//  TTMAppointEndViewController.m
//  ToothManager
//
//  Created by Argo Zhang on 16/6/17.
//  Copyright © 2016年 roger. All rights reserved.
//

#import "TTMAppointEndViewController.h"
#import "TTMCompleteAppointmentCell.h"
#import "TTMChargeDetailController.h"
#import "TTMOrderController.h"
#import "TTMChairModel.h"
#import "TTMScheduleDetailController.h"
#import "TTMScheduleCellModel.h"
#import "TTMAppointDetailViewController.h"
#import "TTMOrderTool.h"

#define kSegmentH 40.f
#define kMargin 20.f
#define kSectionH 30.f

@interface TTMAppointEndViewController ()<UITableViewDelegate,UITableViewDataSource,TTMCompleteAppointmentCellDelegate>

@property (nonatomic, weak)   UITableView *tableView;

@property (nonatomic, strong) NSArray *sections; // 展示的 分组 , 存放nsdictionary ，key:(title,data)

@property (nonatomic, copy) NSArray *allDataArray; // 所有数组

@property (nonatomic, strong)   TTMOrderQueryModel *queryModel;

@end

@implementation TTMAppointEndViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self setupTableView];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(sortByNotification:)
                                                 name:TTMOrderControllerChairChangedNotification
                                               object:nil];
}

- (void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    //查询数据
    if (self.currentChair) {
        self.queryModel.seatId = self.currentChair.seat_id;
    }else{
        self.queryModel.seatId = @"";
    }
    [self queryWithQueryModel:self.queryModel];
}


/**
 *  加载tableview
 */
- (void)setupTableView {
    CGFloat tableHeight = ScreenHeight - NavigationHeight - kSegmentH;
    UITableView *tableView = [[UITableView alloc] initWithFrame:CGRectMake(0, 0, ScreenWidth, tableHeight)
                                                          style:UITableViewStyleGrouped];
    tableView.delegate = self;
    tableView.dataSource = self;
    tableView.backgroundColor = [UIColor clearColor];
    tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    [self.view addSubview:tableView];
    self.tableView = tableView;
    
    __weak typeof(self) weakSelf = self;
    [tableView addLegendHeaderWithRefreshingBlock:^{
        [weakSelf queryWithQueryModel:weakSelf.queryModel];
    }];
}

#pragma mark - UITableViewDelegate

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return self.sections.count;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    NSDictionary *sectionDict = self.sections[section];
    NSArray *sectionArray = sectionDict[@"data"];
    return sectionArray.count;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section {
    return kSectionH;
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
    UILabel *yearLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, ScreenWidth, kSectionH)];
    yearLabel.backgroundColor = [UIColor clearColor];
    yearLabel.textAlignment = NSTextAlignmentCenter;
    yearLabel.font = [UIFont systemFontOfSize:15];
    NSDictionary *sectionDict = self.sections[section];
    yearLabel.text = sectionDict[@"title"];
    return yearLabel;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    NSDictionary *sectionDict = self.sections[indexPath.section];
    NSArray *sectionArray = sectionDict[@"data"];
    TTMCompleteApointmentCellModel *model = sectionArray[indexPath.row];
    return model.cellHeight;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    TTMCompleteAppointmentCell *cell = [TTMCompleteAppointmentCell cellWithTableView:tableView];
    if (self.sections.count > 0) {
        NSDictionary *sectionDict = self.sections[indexPath.section];
        NSArray *sectionArray = sectionDict[@"data"];
        if (sectionArray.count > 0) {
            cell.model = sectionArray[indexPath.row];
            cell.delegate = self;
        }
    }
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    
}

- (void)completeAppointmentCell:(TTMCompleteAppointmentCell *)completeAppointmentCell
                          model:(TTMApointmentModel *)model {
    TTMChargeDetailController *chargeVC = [TTMChargeDetailController new];
    chargeVC.model = model;
    [self.navigationController pushViewController:chargeVC animated:YES];
}

- (void)completeAppointmentCell:(TTMCompleteAppointmentCell *)completeAppointmentCell
           clickedLineWithModel:(TTMApointmentModel *)model {
    TTMScheduleCellModel *temp = [[TTMScheduleCellModel alloc] init];
    temp.keyId = model.KeyId;
    //    TTMScheduleDetailController *detailVC = [[TTMScheduleDetailController alloc] init];
    //    detailVC.model = temp;
    //    [self.navigationController pushViewController:detailVC animated:YES];
    
    TTMAppointDetailViewController *detailVC = [[TTMAppointDetailViewController alloc] init];
    detailVC.model = temp;
    [self.navigationController pushViewController:detailVC animated:YES];
}

/**
 *  查询完成的预约
 *
 */
- (void)queryWithQueryModel:(TTMOrderQueryModel *)queryModel {
    __weak __typeof(&*self) weakSelf = self;
    [TTMOrderTool queryAppointmentListWithQueryModel:queryModel complete:^(id result) {
        if ([weakSelf.tableView.header isRefreshing]) {
            [weakSelf.tableView.header endRefreshing];
        }
        if([result isKindOfClass:[NSString class]]) {
            [MBProgressHUD showToastWithText:result];
        } else {
            
            self.allDataArray = result; // 原始的所有数据
            weakSelf.sections = [weakSelf sortArrayByYear:result];
            [weakSelf.tableView reloadData];
        }
    }];
}

/**
 *  按年分组排序
 *
 *  @param array 返回的结果数组
 *
 *  @return TTMIncomeCellModel 数组
 */
- (NSArray *)sortArrayByYear:(NSArray *)array {
    NSMutableArray *yearArray = [NSMutableArray array];
    NSDate *lastDate = nil; // 上一次date
    
    for (NSUInteger i = 0; i < array.count; i ++) {
        TTMApointmentModel *scheduleModel = array[i];
        NSDate *dateTime = [scheduleModel.appoint_time dateValue]; // 这一条数据的时间
        
        if ([dateTime fs_year] != [lastDate fs_year]) { // 与前一条数据的年份不相同
            NSMutableArray *monthArray = [NSMutableArray array];
            [monthArray addObject:scheduleModel];
            [yearArray addObject:monthArray];
        } else { // 相同则继续添加
            NSMutableArray *monthArray = [yearArray lastObject];
            [monthArray addObject:scheduleModel];
        }
        lastDate = [dateTime copy];
    }
    
    NSMutableArray *tempArray = [NSMutableArray array];
    for (NSMutableArray *yearsMonth in yearArray) {
        NSArray *monthArray = [self sortArrayByMonth:yearsMonth]; // 得到月份数组
        TTMCompleteApointmentCellModel *cellModel = monthArray[0];
        NSDictionary *dict = @{@"title": [cellModel.year stringByAppendingString:@"年"],
                               @"data": monthArray};
        [tempArray addObject:dict];
    }
    return tempArray;
}

/**
 *  按月分组排序
 *
 *  @param array 返回的结果数组
 *
 *  @return TTMIncomeCellModel 数组
 */
- (NSArray *)sortArrayByMonth:(NSArray *)array {
    NSMutableArray *mutArray = [NSMutableArray array];
    NSDate *lastDate = nil;
    
    for (NSUInteger i = 0; i < array.count; i ++) {
        TTMApointmentModel *incomeModel = array[i];
        NSDate *dateTime = [incomeModel.appoint_time dateValue]; // 这一条数据的时间
        
        if ([dateTime fs_month] != [lastDate fs_month]) { // 与前一条数据的月份不相同
            TTMCompleteApointmentCellModel *incomeCellModel = [[TTMCompleteApointmentCellModel alloc] init];
            incomeCellModel.month = [NSString stringWithFormat:@"%@", @([dateTime fs_month])];
            incomeCellModel.year = [NSString stringWithFormat:@"%@", @([dateTime fs_year])];
            [incomeCellModel.infoList addObject:incomeModel];
            [mutArray addObject:incomeCellModel];
        } else { // 相同则继续添加
            TTMCompleteApointmentCellModel *incomeCellModel = [mutArray lastObject];
            [incomeCellModel.infoList addObject:incomeModel];
        }
        lastDate = [dateTime copy];
    }
    return mutArray;
}

/**
 *  通知根据椅位排序
 *
 *  @param notification 通知信息
 */
- (void)sortByNotification:(NSNotification *)notification {
    TTMChairModel *chairModel = notification.object;
    self.currentChair = chairModel;
    
    if (self.currentChair) {
        self.queryModel.seatId = self.currentChair.seat_id;
    }else{
        self.queryModel.seatId = @"";
    }
    [self queryWithQueryModel:self.queryModel];
}

#pragma mark - ********************* Lazy Method ***********************
- (TTMOrderQueryModel *)queryModel{
    if (!_queryModel) {
        _queryModel = [[TTMOrderQueryModel alloc] initWithReserveStatus:[@(TTMApointmentStatusComplete) stringValue] seatId:@"" pageIndex:0 pageSize:0];
    }
    return _queryModel;
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end
